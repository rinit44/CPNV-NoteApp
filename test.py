import unittest
from unittest.mock import patch
import json
from app import app

class TestCPNVNoteApp(unittest.TestCase):
    
    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True

    @patch('app._execute')
    def test_get_notes(self, mock_execute):
        mock_execute.return_value = [
            {"ID": 1, "Value": 5.5, "coefficient": 40.0, "Date": "2026-03-29", "Matiers_ID": 1}
        ]

        response = self.client.get('/notes')

        self.assertEqual(response.status_code, 200)

        data = json.loads(response.data)
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]["Value"], 5.5)

    @patch('app._execute')
    def test_create_matiere(self, mock_execute):
        mock_execute.return_value = (5, 1)

        nouvelle_matiere = {
            "name": "Physique",
            "teacher": "M. Einstein",
            "theme": "Mécanique"
        }

        response = self.client.post('/matieres', 
                                    data=json.dumps(nouvelle_matiere),
                                    content_type='application/json')

        self.assertEqual(response.status_code, 201)

        data = json.loads(response.data)
        self.assertEqual(data["message"], "Matière créée")
        self.assertEqual(data["id"], 5)

if __name__ == '__main__':
    unittest.main()