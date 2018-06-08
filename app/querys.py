from config import Config

#
# This code is put in a separate file to remove the warnings of the spelling checker in the PyCharm editor
#

CREATE_USER = '''
CREATE ROLE {} LOGIN PASSWORD '{}' NOSUPERUSER NOCREATEROLE;
'''.format(Config.DATABASE_USER, Config.DATABASE_PASSWORD)

CREATE_DATABASE = '''
CREATE DATABASE {} WITH OWNER={} ENCODING utf8;
'''.format(Config.DATABASE_NAME, Config.DATABASE_USER)

CREATE_TABLE_TICKETS = '''
CREATE TABLE public.tickets (
    id int PRIMARY KEY NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone,
    subject character varying(255),
    message text,
    email character varying(255),
    state int DEFAULT 1 NOT NULL
);
'''


CREATE_TABLE_COMMENTS = '''
CREATE TABLE public.comments
(
    id int PRIMARY KEY NOT NULL,
    ticket_id int NOT NULL REFERENCES tickets(id),
    created_at timestamp without time zone DEFAULT NOW() NOT NULL,
    email varchar(255),
    message text
);
'''

# COMMENT_FOREIGN_KEY = '''
# ALTER TABLE public.comments
# ADD CONSTRAINT comments_tickets_id_fk
# FOREIGN KEY (ticket_id) REFERENCES tickets (id);
# '''

DROP_DATABASE = '''
DROP DATABASE IF EXISTS {};
'''.format(Config.DATABASE_NAME)

ADD_TICKET = '''
INSERT INTO tickets(subject, message, email) values (%(subject)s, %(message)s, %(email)s);
'''

GET_LAST_TICKET_ID = '''
SELECT id, created_at FROM tickets WHERE id = (SELECT LASTVAL());
'''

SAVE_TICKET = '''
UPDATE tickets SET subject=%(subject)s, message=%(message)s, email=%(email)s, state=%(state)s, updated_at=NOW() WHERE id=%(id)s;
'''

GET_TICKET_LAST_UPDATE = '''
SELECT updated_at FROM tickets WHERE id=%(id)s;
'''

ADD_COMMENT = '''
INSERT INTO comments(ticket_id, email, message) values (%(ticket_id)s, %(email)s, %(message)s);
'''

GET_LAST_COMMENT_ID = '''
SELECT id, created_at FROM comments WHERE id = (SELECT LASTVAL());
'''

DELETE_COMMENT = '''
DELETE FROM comments WHERE id=%(id)s;
'''

DELETE_COMMENTS = '''
DELETE FROM comments;
'''

DELETE_TICKET = '''
DELETE FROM tickets WHERE id=%(id)s;
'''

DELETE_TICKETS = '''
DELETE FROM tickets;
'''

SELECT_TICKET = '''
SELECT message, email, subject, created_at, state, updated_at, id FROM tickets WHERE id=%(id)s;
'''

SELECT_TICKETS = '''
SELECT message, email, subject, created_at, state, updated_at, id FROM tickets;
'''

SELECT_TICKETS_COUNT = '''
SELECT COUNT(id) FROM tickets; 
'''

SELECT_COMMENT = '''
SELECT message, email, ticket_id, created_at, id FROM comments WHERE id=%(id)s;
'''

SELECT_TICKET_COMMENTS = '''
SELECT message, email, ticket_id, created_at, id FROM comments WHERE ticket_id=%(ticket_id)s;
'''

DELETE_TICKET_COMMENTS = '''
DELETE FROM comments WHERE ticket_id=%(ticket_id)s;
'''

SELECT_COMMENTS = '''
SELECT message, email, ticket_id, created_at, id FROM comments;
'''

SELECT_TICKET_COMMENTS_COUNT = '''
SELECT COUNT(id) FROM comments WHERE ticket_id=%(ticket_id)s;
'''

SELECT_COMMENTS_COUNT = '''
SELECT COUNT(id) FROM comments;
'''
