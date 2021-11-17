"""[summary]
"""
# pylint: disable = E1101, C0413, W1508, R0903, W0603, E0401, W0511, C0103, E0237, W0702, W0622, W0613, C0114, C0301, W0107
import unittest
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
from app import calculate_average


class AppDBTest(unittest.TestCase):
    """[summary]

    Args:
        unittest ([type]): [description]
    """

    def test_calulate_average(self):
        """[summary]"""
        self.assertEqual(calculate_average([3, 4, 5]), 4.0)

    def test_calculate_almost_average(self):
        """[summary]"""
        self.assertAlmostEqual(calculate_average([3, 4, 6]), 4.3333333)


if __name__ == "__main__":
    unittest.main()
