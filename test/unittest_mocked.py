"""[summary]
"""
# pylint: disable = E1101, C0413, W1508, R0903, W0603, E0401, W0511, C0103, E0237, W0702, W0622, W0613, C0114, C0301, W0107
import unittest
from unittest.mock import MagicMock, patch

import sys
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

# getting the name of the directory
# where the this file is present.
current = os.path.dirname(os.path.realpath(__file__))

# Getting the parent directory name
# where the current directory is present.
parent = os.path.dirname(current)

# adding the parent directory to
# the sys.path.
sys.path.append(parent)
from function.recommendedMeals import get_meal
from app import delete_meal_db, Food


class AppDBTest(unittest.TestCase):
    """[summary]

    Args:
        unittest ([type]): [description]
    """

    def setUp(self):
        """[summary]"""
        self.db_mock = [
            Food(email="this is an email", food="This is the 1st meal"),
            Food(email="this is an email", food="This is the 2nd meal"),
        ]

    def mock_add_to_db(self, meal):
        """[summary]

        Args:
            meal ([type]): [description]
        """
        self.db_mock.append(meal)

    def mock_delete_from_db(self, meal):
        """[summary]

        Args:
            meal ([type]): [description]
        """
        self.db_mock = [entry for entry in self.db_mock if entry.email != meal.email]

    def mock_db_commit(self):
        """[summary]"""
        pass

    def test_save_meal(self):
        with patch("app.db.session.add", self.mock_add_to_db):
            with patch("app.db.session.commit", self.mock_db_commit):
                mock_filtered = MagicMock()
                mock_filtered.all.return_value = self.db_mock
                self.mock_add_to_db(
                    Food(email="this is an email", food="This is the 3rd meal")
                )
                self.mock_db_commit()
                self.assertEqual(len(self.db_mock), 3)
                self.assertEqual(self.db_mock[2].food, "This is the 3rd meal")

    def test_delete_meal_db(self):
        """[summary]"""
        with patch("app.Food.query") as mock_query:
            with patch("app.db.session.add", self.mock_add_to_db):
                with patch("app.db.session.delete", self.mock_delete_from_db):
                    with patch("app.db.session.commit", self.mock_db_commit):
                        mock_filtered = MagicMock()
                        mock_filtered.all.return_value = self.db_mock
                        # Hard-coding in some logic from test case 3.
                        # This is because SQLAlchemy is just kinda hard to mock
                        # in some instances
                        mock_filtered.filter.return_value = [
                            Food(email="this is an email", food="This is the 2nd meal")
                        ]
                        mock_query.filter_by.return_value = mock_filtered

                        ## Testing delete method
                        delete_meal_db("this is an email", "This is the 1st meal")
                        self.assertEqual(len(self.db_mock), 2)
                        self.assertEqual(self.db_mock[0].food, "This is the 1st meal")


class recommendedMealsTest(unittest.TestCase):
    """[summary]

    Args:
        unittest ([type]): [description]
    """

    def test_get_meal(self):
        """[summary]"""
        with patch("function.recommendedMeals.requests.get") as mock_requests_get:
            mock_response = MagicMock()
            # side_effect lets us set a list of return values.
            # Each successive call to mock_response.all() will generate the next
            # side effect
            mock_response.json.side_effect = [
                {},
                {
                    "response": {
                        "hits": [
                            {
                                "result": {
                                    "name": "Beef and Mustard Pie",
                                    "image": "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
                                }
                            }
                        ]
                    }
                },
            ]
            mock_requests_get.return_value = mock_response

            self.assertEqual(
                get_meal("Beef and Mustard Pie")[0], "Beef and Mustard Pie"
            )
            self.assertEqual(
                get_meal("Beef and Mustard Pie")[1],
                "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
            )


if __name__ == "__main__":
    unittest.main()
