import unittest
from flask import url_for, json
from app import create_app, DB


class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('default')
        self.app_context = self.app.app_context()
        self.app_context.push()
        self.client = self.app.test_client()

    def tearDown(self):
        db = DB(self.app.config['DATABASE_URI'])
        # db.delete_comments()
        # db.delete_tickets()
        self.app_context.pop()

    def test_tickets(self):
        response = self.client.post(
            url_for('api.new_ticket'),
            json=json.dumps({"message": "", "subject": "", "email": ""}),
            content_type='application/json'
        )

        self.assertTrue(response.status_code == 400)

        # write a ticket
        response = self.client.post(
            url_for('api.new_ticket'),
            data=json.dumps({"message": "test_message", "subject": "test_subject", "email": "test_email"}),
            content_type='application/json'
        )

        self.assertTrue(response.status_code == 201)
        url = response.headers.get('Location')
        self.assertIsNotNone(url)

        # get the new ticket
        response = self.client.get(url)
        self.assertTrue(response.status_code == 200)
        json_response = json.loads(response.data.decode('utf-8'))

        self.assertTrue(json_response['email'] == 'test_email')
        self.assertTrue(json_response['message'] == 'test_message')

        ticket_id = json_response['id']

        # add new comment
        response = self.client.post(
            url_for('api.new_ticket_comment', id=ticket_id),
            data=json.dumps({"message": "test_comment", "email": "test_email"}),
            content_type='application/json'
        )
        self.assertTrue(response.status_code == 201)
        url = response.headers.get('Location')
        self.assertIsNotNone(url)

        # count comments from ticket
        for item in range(10):
            self.client.post(
                url_for('api.new_ticket_comment', id=ticket_id),
                data=json.dumps({"message": "test_comment", "email": "test_email"}),
                content_type='application/json'
            )

        response = self.client.get(url_for('api.get_ticket', id=ticket_id))
        self.assertTrue(response.status_code == 200)
        json_response = json.loads(response.data.decode('utf-8'))
        comments_count = len(json_response['comments'])

        response = self.client.get(url_for('api.get_ticket_comments', id=ticket_id))
        self.assertTrue(response.status_code == 200)
        json_response = json.loads(response.data.decode('utf-8'))
        self.assertEqual(int(json_response['count']), comments_count)

        # test ticket state
        response = self.client.put(url_for('api.set_state', id=ticket_id))
        json_response = json.loads(response.data.decode('utf-8'))
        self.assertEqual(json_response[0]['next_state'], 'ожидает ответ')

        # test ticket close
        response = self.client.put(url_for('api.close', id=ticket_id))
        json_response = json.loads(response.data.decode('utf-8'))
        self.assertEqual(json_response['state_str'], 'закрыт')

    def test_new_tickets(self):
        for _i in range(30):
        # write a ticket
            response = self.client.post(
                url_for('api.new_ticket'),
                data=json.dumps({"message": "test_message", "subject": "test_subject", "email": "test_email"}),
                content_type='application/json'
            )

            self.assertTrue(response.status_code == 201)