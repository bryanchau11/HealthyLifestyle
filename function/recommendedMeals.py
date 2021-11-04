from dotenv import load_dotenv, find_dotenv
import flask
import os
import requests

load_dotenv(find_dotenv())


def get_recommended_meals():
    """Yummly API: https://rapidapi.com/apidojo/api/yummly2/"""

    url = "https://yummly2.p.rapidapi.com/feeds/list"

    querystring = {"limit": "30", "start": "0", "tag": "list.recipe.popular"}

    headers = {
        "x-rapidapi-host": "yummly2.p.rapidapi.com",
        "x-rapidapi-key": os.getenv("RapidAPI"),
    }

    response = requests.request("GET", url, headers=headers, params=querystring).json()
    list_of_food = []
    list_of_image = []
    for food in response["feed"]:
        list_of_food.append(food["display"]["displayName"])
    for image in response["feed"]:
        list_of_image.append(image["display"]["images"][0])
    return list_of_food, list_of_image
