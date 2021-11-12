import unittest
from unittest.mock import MagicMock, patch

import sys
import os


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


class recommendedMealsTest(unittest.TestCase):
    def test_get_meal(self):
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
