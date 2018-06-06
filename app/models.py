from urllib import parse
import psycopg2
from flask import json


from app.exceptions import ModelNotFound, ValidationError
from app.querys import CREATE_DATABASE, CREATE_TABLE_TICKETS, CREATE_TABLE_COMMENTS, DROP_DATABASE, \
    ADD_TICKET, ADD_COMMENT, SELECT_TICKET, SELECT_COMMENTS, SAVE_TICKET, CREATE_USER, SELECT_COMMENT, \
    SELECT_COMMENTS_COUNT, SELECT_TICKETS_COUNT, SELECT_TICKETS, GET_LAST_COMMENT_ID, GET_LAST_TICKET_ID, \
    GET_TICKET_LAST_UPDATE, DELETE_COMMENT, DELETE_COMMENTS, DELETE_TICKET, DELETE_TICKETS, SELECT_TICKET_COMMENTS, \
    SELECT_TICKET_COMMENTS_COUNT, DELETE_TICKET_COMMENTS


class DB(object):
    def __init__(self, database_uri):
        url = parse.urlparse(database_uri)
        db = "dbname=%s user=%s password=%s host=%s " % (url.path[1:], url.username, url.password, url.hostname)
        try:
            self.connect = psycopg2.connect(db)
        except psycopg2.OperationalError as e:
            print(e)
            print('Для создания пользователя используйте комманду:\n{}'.format(CREATE_USER))
            print('Для создания базы данных используйте комманду:\n{}'.format(CREATE_DATABASE))
            exit()

    def close(self):
        self.connect.close()

    def execute(self, query, params=None):
        if not params:
            params = {}
        # print(query)
        try:
            print(query)
            print(params)
            cursor = self.connect.cursor()
            cursor.execute(query, params)
        except psycopg2.ProgrammingError as e:
            print(e)
            self.connect.close()
            exit()
        else:
            self.connect.commit()
            return cursor

    def create_tables(self):
        self.execute(CREATE_TABLE_TICKETS)
        self.execute(CREATE_TABLE_COMMENTS)

    def drop_all(self):
        self.execute(DROP_DATABASE)
        self.connect.commit()

    def fetch_one(self, query, params=None):
        cursor = self.execute(query, params)
        return cursor.fetchone()

    def fetch_all(self, query, params=None):
        cursor = self.execute(query, params)
        return cursor.fetchall()

    def add_ticket(self, ticket):
        self.execute(ADD_TICKET, ticket.get_attrs())
        ticket.id, ticket.created_at = self.fetch_one(GET_LAST_TICKET_ID)
        return ticket

    def save_ticket(self, ticket):
        if not ticket.id:
            raise Exception('Can\'t save ticket without id')
        self.execute(SAVE_TICKET, ticket.get_attrs())
        ticket.updated_at = self.fetch_one(GET_TICKET_LAST_UPDATE, {'id': ticket.id})
        return ticket

    def get_ticket(self, id):
        return self.fetch_one(SELECT_TICKET, {'id': id})

    def get_tickets(self):
        for item in self.fetch_all(SELECT_TICKETS):
            yield Ticket.from_db(item)

    def get_tickets_count(self):
        return self.fetch_one(SELECT_TICKETS_COUNT)[0]

    def change_state(self, ticket):
        self.execute(SAVE_TICKET, ticket.get_attrs())

    def add_comment(self, comment):
        self.execute(ADD_COMMENT, comment.get_attrs())
        comment.id, comment.created_at = self.fetch_one(GET_LAST_COMMENT_ID)
        return comment

    def get_comment(self, id):
        return self.fetch_one(SELECT_COMMENT, {'id': id})

    def get_comments(self, ticket_id=None):
        if ticket_id:
            for item in self.fetch_all(SELECT_TICKET_COMMENTS, {'ticket_id': ticket_id}):
                yield Comment.from_db(item)
        else:
            for item in self.fetch_all(SELECT_COMMENTS):
                yield Comment.from_db(item)

    def get_comments_count(self, ticket_id=None):
        if ticket_id:
            return self.fetch_one(SELECT_TICKET_COMMENTS_COUNT, {'ticket_id':ticket_id})[0]
        else:
            return self.fetch_one(SELECT_COMMENTS_COUNT)[0]

    def delete_comment(self, id):
        return self.execute(DELETE_COMMENT, {'id':id})

    def delete_comments(self, ticket_id=None):
        if ticket_id:
            return self.execute(DELETE_TICKET_COMMENTS, {'ticket_id':ticket_id})
        else:
            return self.execute(DELETE_COMMENTS)

    def delete_ticket(self, id):
        self.delete_comments(ticket_id=id)
        return self.execute(DELETE_TICKET, {'id':id})

    def delete_tickets(self):
        return self.execute(DELETE_TICKETS)


class Base(object):
    def __init__(self, message, email, created_at=None, id=None):
        self.id = id
        if len(message):
            self.message = message
        else:
            raise ValidationError('Заполните сообщение')

        if len(email):
            self.email = email
        else:
            raise ValidationError('Заполните email')

        self.created_at = created_at

    @classmethod
    def from_json(cls, json_str, **kwargs):
        # Need for tests, json bug with empty strings
        if isinstance(json_str, str):
            json_data = json.loads(json_str)
        elif isinstance(json_str, dict):
            json_data = json_str
        if kwargs:
            json_data.update(kwargs)
        return cls(**json_data)

    def get_attrs(self):
        return {
            'id': self.id,
            'message': self.message,
            'email': self.email,
            'created_at': self.created_at
        }


class Ticket(Base):
    # message, email, subject, created_at, state, updated_at, id
    def __init__(self, message, email, subject, created_at=None, state=None, updated_at=None, id=None):
        super(Ticket, self).__init__(message, email, created_at, id)
        if len(subject):
            self.subject = subject
        else:
            raise ValidationError('Заполните тему')
        self.updated_at = updated_at
        self.state = state or TicketState.OPEN

    def get_state(self):
        return TicketState.string_state(self.state)

    def update_state(self, force_close=False):
        self.state = TicketState.get_next_state(self.state, force_close)

    @classmethod
    def from_db(cls, cls_tuple):
        if not cls_tuple:
            raise ModelNotFound('Тикет не найден')
        return cls(*cls_tuple)

    def get_attrs(self, to_json=False):
        attrs = super(Ticket, self).get_attrs()
        attrs.update({
            'subject': self.subject,
            'updated_at': self.updated_at,
            'state': TicketState.string_state(self.state) if to_json else int(self.state)
        })
        return attrs


class Comment(Base):
    # message, email, ticket_id, created_at, id
    def __init__(self, message, email, ticket_id, created_at=None, id=None):
        super(Comment, self).__init__(message, email, created_at, id)
        if ticket_id:
            self.ticket_id = ticket_id
        else:
            raise ValidationError('Тикет комментария не заполнен')

    @classmethod
    def from_db(cls, cls_tuple):
        if not cls_tuple:
            raise ModelNotFound('Комментарий не найден')
        return cls(*cls_tuple)

    def get_attrs(self):
        attrs = super(Comment, self).get_attrs()
        attrs.update({
            'ticket_id': self.ticket_id
        })
        return attrs


class TicketState(object):
    OPEN = 0x01
    ANSWERED = 0x02
    AWAITING = 0x04
    CLOSED = 0x08

    @staticmethod
    def get_next_state(current_state, force_close=False):
        if force_close:
            return TicketState.CLOSED

        if current_state == TicketState.CLOSED:
            return current_state
        else:
            return current_state << 0x01

    @staticmethod
    def string_state(current_state):
        result = 'Not defined'
        if current_state == TicketState.OPEN:
            result = 'открыт'
        elif current_state == TicketState.ANSWERED:
            result = 'отвечен'
        elif current_state == TicketState.AWAITING:
            result = 'ожидает ответ'
        elif current_state == TicketState.CLOSED:
            result = 'закрыт'
        return result
