from dotenv import load_dotenv, find_dotenv
import flask
import os
import requests

load_dotenv(find_dotenv())


def get_recommended_meals():

    url = "https://themealdb.p.rapidapi.com/randomselection.php"
    headers = {
        "x-rapidapi-host": "themealdb.p.rapidapi.com",
        "x-rapidapi-key": os.getenv("RapidAPI"),
    }

    response = requests.request("GET", url, headers=headers).json()
    list_of_food = []
    list_of_image = []
    for food in response["meals"]:
        list_of_food.append(food["strMeal"])
    for image in response["meals"]:
        list_of_image.append(image["strMealThumb"])
    return list_of_food, list_of_image
