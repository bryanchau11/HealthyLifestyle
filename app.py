import flask
import os
import json
from dotenv import load_dotenv, find_dotenv
from flask_login import (
    login_user,
    current_user,
    LoginManager,
    logout_user,
    login_required,
)
import random
import base64
import requests
import urllib.request
from flask import redirect, send_from_directory
from function.recommendedMeals import get_recommended_meals, get_meal

load_dotenv(find_dotenv())
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from oauthlib.oauth2 import WebApplicationClient

app = flask.Flask(__name__, static_folder="./build/static")
# This tells our Flask app to look at the results of `npm build` instead of the
# actual files in /templates when we're looking for the index page file. This allows
# us to load React code into a webpage. Look up create-react-app for more reading on
# why this is necessary.
db_url = os.getenv("DATABASE_URL")
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)
app.config["SQLALCHEMY_DATABASE_URI"] = db_url
# Gets rid of a warning
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = os.getenv("SECRETKEY")  # don't defraud my app ok?

db = SQLAlchemy(app)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    password = db.Column(db.String(700))
    height = db.Column(db.String(10))
    weight = db.Column(db.String(10))
    bmi = db.Column(db.String(10))

    def __repr__(self):
        return f"<User {self.username}>"

    def get_username(self):
        return self.username


class Food(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    food = db.Column(db.String(100))


engine = create_engine(db_url)
# User.__table__.drop(engine)
db.create_all()

# Vars needed for google login
GOOGLE_CLIENT_ID = os.getenv("GOOGLEOAUTH_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLEOAUTH_CLIENT_SECRET")
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)

# OAuth 2 client setup
client = WebApplicationClient(GOOGLE_CLIENT_ID)

bp = flask.Blueprint("bp", __name__, template_folder="./build")


@bp.route("/index")
@login_required
def index():
    list_of_food, list_of_image = get_recommended_meals()
    list_of_item = [
        {"food": food, "image": image}
        for food, image in zip(list_of_food, list_of_image)
    ]
    meal_db_list = []
    meal_db = Food.query.filter_by(username=current_user.username).all()
    if len(meal_db) == 0:
        pass
    else:
        for meal in meal_db:

            name, image = get_meal(meal.food)
            meal_db_list.append({"name": name, "image": image})
    DATA = {
        "current_user": current_user.username,
        "height": current_user.height,
        "weight": current_user.weight,
        "bmi": current_user.bmi,
        "list_of_food": list_of_food,
        "list_of_image": list_of_image,
        "list_of_item": list_of_item,
        "saved_meal": meal_db_list,
    }
    data = json.dumps(DATA)
    return flask.render_template(
        "index.html",
        data=data,
    )


@app.route("/logout", methods=["POST"])
@login_required
def logout():
    """This function will logout user
    Returns:
        / endpoint
    """
    logout_user()
    return redirect("/")


app.register_blueprint(bp)


login_manager = LoginManager()
login_manager.login_view = "login"
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_name):
    return User.query.get(user_name)


@app.route("/signup", methods=["POST", "GET"])
def signup():
    if current_user.is_authenticated:
        return flask.redirect(flask.url_for("bp.index"))
    if flask.request.method == "POST":
        username = flask.request.form.get("username")
        password = flask.request.form.get("password")
        if username == "" or password == "":
            flask.flash("Please enter username or password")
            return flask.render_template("signup.html")
        user = User.query.filter_by(username=username).first()
        if user:
            flask.flash("User exists")
            return flask.render_template("signup.html")
        new_user = User(
            username=username,
            password=generate_password_hash(password, method="sha256"),
        )
        db.session.add(new_user)
        db.session.commit()
        return redirect("/login")
    return flask.render_template("signup.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return flask.redirect(flask.url_for("bp.index"))

    if flask.request.method == "POST":
        if flask.request.form['submit_button'] == "GOOGLE LOGIN":
            # Find out what URL to hit for Google Login
            google_provider_cfg = requests.get(GOOGLE_DISCOVERY_URL).json()
            authorization_endpoint = google_provider_cfg["authorization_endpoint"]

            request_uri = client.prepare_request_uri(
                authorization_endpoint,
                redirect_uri=flask.request.base_url + "/callback",
                scope=["openid", "email", "profile"],
            )
            return flask.redirect(request_uri)
        if flask.request.form['submit_button'] == "LOG IN HERE":
            username = flask.request.form.get("username")
            password = flask.request.form.get("password")
            if username == "" or password == "":
                flask.flash("Please enter username or password")
                return flask.render_template("login.html")
            my_user = User.query.filter_by(username=username).first()

            if not my_user or not check_password_hash(my_user.password, password):
                flask.flash("Please check your login details and try again")
                return redirect("/login")

            login_user(my_user)
            return flask.redirect(flask.url_for("bp.index"))

    return flask.render_template("login.html")

@app.route("/login/callback")
def callback():
    # Get authorization code Google sent back to you
    code = flask.request.get("code")

    # Find out what URL to hit to get tokens that allow you to ask for
    # things on behalf of a user
    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    # Prepare and send a request to get tokens
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=code
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    # Parse the tokens
    client.parse_request_body_response(json.dumps(token_response.json()))

    # Find/hit URL for Google user's profile image and email
    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_name = userinfo_response.json()["given_name"]
        picture = userinfo_response.json()["picture"]
    else:
        return "User email not available or not verified by Google.", 400

    user = User.query.filter_by(id=unique_id, username=users_name).first()
    if user:
        login_user(user)
        return flask.redirect(flask.url_for("bp.index"))
    
    new_user = User(
        id = unique_id,
        username = users_name,
        password = generate_password_hash("This is a google account use google login instead", sha256)
    )
    db.session.add(new_user)
    db.session.commit()

    login_user(new_user)
    return flask.redirect(flask.url_for("bp.index"))

@app.route("/user", methods=["PUT"])
@login_required
def get_user():
    data = flask.request.get_json(force=True)
    print(data)
    DATA = {
        "current_user": current_user.username,
        "height": current_user.height,
        "weight": current_user.weight,
    }
    if data["username"] != "":
        user = User.query.filter_by(username=current_user.username).first()
        user.username = data["username"]
        db.session.commit()
        current_user.username = data["username"]
        DATA["current_user"] = data["username"]

    if data["height"] != "":
        user = User.query.filter_by(username=current_user.username).first()
        user.height = data["height"]
        db.session.commit()
        DATA["height"] = data["height"]

    if data["weight"] != "":
        user = User.query.filter_by(username=current_user.username).first()
        user.weight = data["weight"]
        db.session.commit()
        DATA["weight"] = data["weight"]

    if data["password"] != "":
        user = User.query.filter_by(username=current_user.username).first()
        user.password = generate_password_hash(data["password"], method="sha256")
        db.session.commit()
        DATA["password"] = data["password"]

    if data["bmi"] != "":
        user = User.query.filter_by(username=current_user.username).first()
        user.bmi = data["bmi"]
        db.session.commit()
        DATA["bmi"] = data["bmi"]

    response = app.response_class(
        response=json.dumps(DATA), status=200, mimetype="application/json"
    )
    return response


@app.route("/save_meal", methods=["POST"])
def save_meal():
    meal_db = Food.query.filter_by(username=current_user.username).all()
    meal_db_list = [meal.food for meal in meal_db]
    meal = flask.request.json.get("save_meal")
    result_color = "success"
    result_text = "Success! You have saved your meal"
    if meal in meal_db_list:
        result_color = "danger"
        result_text = "You already saved this meal!!"
        pass
    else:
        db.session.add(Food(username=current_user.username, food=meal))
        db.session.commit()
    return flask.jsonify({"color": result_color, "text": result_text})


@app.route("/delete_meal", methods=["POST"])
def delete_meal():
    meal = flask.request.json.get("delete_meal")
    meal_db = Food.query.filter_by(username=current_user.username, food=meal).first()
    db.session.delete(meal_db)
    db.session.commit()


@app.route("/")
def main():
    if current_user.is_authenticated:
        return flask.redirect(flask.url_for("bp.index"))
    return flask.redirect(flask.url_for("login"))


app.run(
    host=os.getenv("IP", "0.0.0.0"),
    port=int(os.getenv("PORT", 8081)),
)
