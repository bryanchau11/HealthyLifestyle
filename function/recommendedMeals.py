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


def get_meal(meal):
    url = "https://themealdb.p.rapidapi.com/search.php"

    querystring = {"s": meal}

    headers = {
        "x-rapidapi-host": "themealdb.p.rapidapi.com",
        "x-rapidapi-key": "fdc15e219fmsh15f5c9f8b497142p131a15jsn0c3185c1f819",
    }

    response = requests.request("GET", url, headers=headers, params=querystring).json()
    if response["meals"] is None:
        return None
    else:
        return response["meals"][0]["strMeal"], response["meals"][0]["strMealThumb"]
