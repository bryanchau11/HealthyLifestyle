from unittest import TestCase, main, mock
import unittest
from function.recommendedMeals import get_meal


class recommendedMealsTest(unittest.TestCase):
    @mock.patch("function.recommendedMeals.requests.post")
    def test_get_meal(self, mock_post):  # 2

        my_mock_response = mock.Mock(status_code=200)  # 3
        my_mock_response.json.return_value = {  # 4
            "result": [
                {
                    "name": "Beef and Mustard Pie",
                    "image": "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
                }
            ]
        }
        mock_post.return_value = my_mock_response
        response = get_meal("Beef and Mustard Pie")
        agent_data = response[0]
        self.assertEqual(agent_data, "Beef and Mustard Pie")


if __name__ == "__main__":
    unittest.main()
