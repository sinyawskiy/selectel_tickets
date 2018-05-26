import unittest
from app.models import Ticket, DB, Comment, TicketState
from config import Config


class ModelsTestCase(unittest.TestCase):
    def setUp(self):
        db = DB(Config.DATABASE_URI)
        # db.create_tables()
        self.db = db
        self.ticket_json = '''{
            "message": "test_message",
            "subject": "test_subject",
            "email": "email@host.com"
        }'''
        self.comment_json = '''{
            "message": "test_comment",
            "email": "email@host.com",
            "ticket_id": %d
        }
        '''

    def tearDown(self):
        pass

    def test_models(self):
        new_ticket = Ticket.from_json(self.ticket_json)
        created_ticket = self.db.add_ticket(new_ticket)
        db_ticket = Ticket.from_db(self.db.get_ticket(created_ticket.id))
        ticket_id = created_ticket.id
        self.assertEqual(created_ticket.created_at, db_ticket.created_at)
        db_ticket.state = TicketState.get_next_state(db_ticket.state)
        self.db.save_ticket(db_ticket)
        updated_ticket = Ticket.from_db(self.db.get_ticket(db_ticket.id))
        self.assertEqual(db_ticket.state, updated_ticket.state)
        self.assertEqual(TicketState.string_state(updated_ticket.state), 'отвечен')
        for ticket in self.db.get_tickets():
            self.assertTrue(isinstance(ticket, Ticket))
        new_comment = Comment.from_json(self.comment_json % ticket_id)
        created_comment = self.db.add_comment(new_comment)
        db_comment = Comment.from_db(self.db.get_comment(created_comment.id))
        self.assertEqual(created_comment.created_at, db_comment.created_at)
        self.db.delete_comments()
        for item in range(10):
            self.db.add_comment(new_comment)
        comments_count = self.db.get_comments_count(ticket_id)
        for comment in self.db.get_comments(ticket_id):
            self.assertTrue(isinstance(comment, Comment))
        self.assertEqual(comments_count, 10)
        self.db.delete_comments()
        self.db.delete_tickets()


if __name__ == '__main__':
    unittest.main()
