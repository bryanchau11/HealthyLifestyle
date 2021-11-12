# pylint: disable = E1101, C0413, W1508, R0903, W0603, E0401, W0511, C0103, E0237, W0702, W0622
"""[summary]

    Returns:
        [type]: [description]
"""
import os
import json
import flask
from dotenv import load_dotenv, find_dotenv
from flask_login import (
    login_user,
    current_user,
    LoginManager,
    logout_user,
    login_required,
    UserMixin,
)
import requests
from flask import redirect
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from werkzeug.security import generate_password_hash, check_password_hash
from oauthlib.oauth2 import WebApplicationClient
from function.recommendedMeals import get_recommended_meals, get_meal

load_dotenv(find_dotenv())


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
app.secret_key = os.getenv("SECRETKEY")

db = SQLAlchemy(app)


class User(UserMixin, db.Model):
    """[summary]

    Args:
        UserMixin ([type]): [description]
        db ([type]): [description]

    Returns:
        [type]: [description]
    """

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80))
    username = db.Column(db.String(80))
    password = db.Column(db.String(700))
    height = db.Column(db.String(10))
    weight = db.Column(db.String(10))
    age = db.Column(db.String(10))
    gender = db.Column(db.String(1))
    bmi = db.Column(db.String(100))
    bfp = db.Column(db.String(100))

    def __repr__(self):
        return f"<User {self.email}>"

    def get_email(self):
        """[summary]

        Returns:
            [type]: [description]
        """
        return self.email


class Food(db.Model):
    """[summary]

    Args:
        db ([type]): [description]
    """

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80))
    food = db.Column(db.String(100))


class Rating(db.Model):
    """[summary]

    Args:
        db ([type]): [description]
    """

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80))
    food = db.Column(db.String(100))
    rating = db.Column(db.Integer)


class Comment(db.Model):
    """[summary]

    Args:
        db ([type]): [description]
    """

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80))
    username = db.Column(db.String(80))
    food = db.Column(db.String(100))
    comment = db.Column(db.String(500))


engine = create_engine(db_url)
# User.__table__.drop(engine)
db.create_all()

# Vars needed for google login
GOOGLE_CLIENT_ID = os.getenv("GOOGLEOAUTH_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLEOAUTH_CLIENT_SECRET")
GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"

# OAuth 2 client setup
client = WebApplicationClient(GOOGLE_CLIENT_ID)

bp = flask.Blueprint("bp", __name__, template_folder="./build")


@bp.route("/index")
@login_required
def index():
    """[summary]

    Returns:
        [type]: [description]
    """
    list_of_food, list_of_image = get_recommended_meals()
    list_of_item = [
        {"food": food, "image": image}
        for food, image in zip(list_of_food, list_of_image)
    ]
    # Getting saved meal for current user
    meal_db_list = []
    meal_db = Food.query.filter_by(email=current_user.email).all()

    if len(meal_db) == 0:
        pass
    else:
        for meal in meal_db:

            name, image = get_meal(meal.food)
            meal_db_list.append({"name": name, "image": image})

    DATA = {
        "current_user_email": current_user.email,
        "current_user": current_user.username,
        "height": current_user.height,
        "weight": current_user.weight,
        "age": current_user.age,
        "gender": current_user.gender,
        "bfp": current_user.bfp,
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
    """[summary]

    Args:
        user_name ([type]): [description]

    Returns:
        [type]: [description]
    """
    return User.query.get(user_name)


@app.route("/signup", methods=["POST", "GET"])
def signup():
    """[summary]

    Returns:
        [type]: [description]
    """
    if current_user.is_authenticated:
        return flask.redirect(flask.url_for("bp.index"))
    if flask.request.method == "POST":
        email = flask.request.form.get("email")
        username = flask.request.form.get("username")
        password = flask.request.form.get("password")
        if email == "" or username == "" or password == "":
            flask.flash("Please enter an email, username, and password")
            return flask.render_template("signup.html")
        user = User.query.filter_by(email=email).first()
        if user:
            flask.flash("User exists")
            return flask.render_template("signup.html")
        new_user = User(
            email=email,
            username=username,
            password=generate_password_hash(password, method="sha256"),
        )
        db.session.add(new_user)
        db.session.commit()
        return redirect("/login")
    return flask.render_template("signup.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    """[summary]

    Returns:
        [type]: [description]
    """
    if current_user.is_authenticated:
        return flask.redirect(flask.url_for("bp.index"))

    if flask.request.method == "POST":
        if flask.request.form["submit_button"] == "GOOGLE LOGIN":
            # Find out what URL to hit for Google Login
            google_provider_cfg = requests.get(GOOGLE_DISCOVERY_URL).json()
            authorization_endpoint = google_provider_cfg["authorization_endpoint"]

            request_uri = client.prepare_request_uri(
                authorization_endpoint,
                redirect_uri=flask.request.base_url + "/callback",
                scope=["openid", "email", "profile"],
            )
            return flask.redirect(request_uri)
        if flask.request.form["submit_button"] == "LOG IN HERE":
            email = flask.request.form.get("email")
            password = flask.request.form.get("password")
            if email == "" or password == "":
                flask.flash("Please enter email or password")
                return flask.render_template("login.html")
            my_user = User.query.filter_by(email=email).first()

            if not my_user or not check_password_hash(my_user.password, password):
                flask.flash("Please check your login details and try again")
                return redirect("/login")

            login_user(my_user)
            return flask.redirect(flask.url_for("bp.index"))

    return flask.render_template("login.html")


@app.route("/login/callback")
def callback():
    """[summary]

    Returns:
        [type]: [description]
    """
    # Get authorization code Google sent back to you
    code = flask.request.args.get("code")

    # Find out what URL to hit to get tokens that allow you to ask for
    # things on behalf of a user
    google_provider_cfg = requests.get(GOOGLE_DISCOVERY_URL).json()
    token_endpoint = google_provider_cfg["token_endpoint"]

    # Prepare and send a request to get tokens
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=flask.request.url,
        redirect_url=flask.request.base_url,
        code=code,
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
        email = userinfo_response.json()["email"]
        users_name = userinfo_response.json()["given_name"]
        # picture = userinfo_response.json()["picture"]
    else:
        flask.flash("User email not available or not verified by Google.")
        return redirect("/login")

    try:
        user = User.query.filter_by(email=email).first()

        if user:
            login_user(user)
            return flask.redirect(flask.url_for("bp.index"))
    except:
        pass

    new_user = User(
        email=email,
        username=users_name,
        password=generate_password_hash(
            os.getenv("GOOGLE_LOGIN_PASSWORD"), method="sha256"
        ),
    )
    db.session.add(new_user)
    db.session.commit()

    login_user(new_user)
    return flask.redirect(flask.url_for("bp.index"))


@app.route("/login/confirm", methods=["POST", "PUT"])
def confirm():
    """[summary]

    Returns:
        [type]: [description]
    """
    if flask.request.method == "POST":
        email = flask.request.form.get("email")
        password = flask.request.form.get("password")
        user = User.query.filter_by(email=email, password=password).first()

        if user:
            user.isgoogle = True
            db.session.commit()
            login_user(user)
            return flask.redirect(flask.url_for("bp.index"))

        flask.flash(
            "Login unsuccessful.  Please check login information and try again."
        )
        return redirect("/login")
    return flask.render_template("confirm.html")


@app.route("/user", methods=["PUT"])
@login_required
def get_user():
    """[summary]

    Returns:
        [type]: [description]
    """
    data = flask.request.get_json(force=True)
    DATA = {
        "current_user": current_user.email,
        "height": current_user.height,
        "weight": current_user.weight,
    }
    user = User.query.filter_by(email=current_user.email).first()
    if data["username"] != "":
        user.username = data["username"]
        current_user.username = data["username"]
        DATA["current_user"] = data["username"]

    if data["height"] != "":
        current_user.height = data["height"]
        user.height = data["height"]
        DATA["height"] = data["height"]

    if data["weight"] != "":
        current_user.weight = data["weight"]
        user.weight = data["weight"]
        DATA["weight"] = data["weight"]

    if data["password"] != "":
        user.password = generate_password_hash(data["password"], method="sha256")
        DATA["password"] = data["password"]

    if data["bmi"] != "":
        current_user.bmi = data["bmi"]
        user.bmi = data["bmi"]
        DATA["bmi"] = data["bmi"]

    if data["age"] != "":
        current_user.age = data["age"]
        user.age = data["age"]
        DATA["age"] = data["age"]

    if data["gender"] != "":
        current_user.gender = data["gender"]
        user.gender = data["gender"]
        DATA["gender"] = data["gender"]

    if data["bfp"] != "":
        current_user.bfp = data["bfp"]
        user.bfp = data["bfp"]
        DATA["bfp"] = data["bfp"]

    db.session.commit()
    response = app.response_class(
        response=json.dumps(DATA), status=200, mimetype="application/json"
    )
    return response


@app.route("/save_meal", methods=["POST"])
def save_meal():
    """[summary]

    Returns:
        [type]: [description]
    """
    meal_db = Food.query.filter_by(email=current_user.email).all()
    meal_db_list = [meal.food for meal in meal_db]
    meal = flask.request.json.get("save_meal")
    result_color = "success"
    result_text = "Success! You have saved your meal"
    if meal in meal_db_list:
        result_color = "danger"
        result_text = "You already saved this meal!!"
    else:
        db.session.add(Food(email=current_user.email, food=meal))
        db.session.commit()
    return flask.jsonify({"color": result_color, "text": result_text})


@app.route("/delete_meal", methods=["POST"])
def delete_meal():
    """[summary]"""
    meal = flask.request.json.get("delete_meal")
    meal_db = Food.query.filter_by(email=current_user.email, food=meal).first()
    db.session.delete(meal_db)
    db.session.commit()


@app.route("/get_average_rating", methods=["POST"])
def avg_rating():
    """[summary]

    Returns:
        [type]: [description]
    """
    meal = flask.request.json.get("foodName")
    meal_db = Rating.query.filter_by(food=meal).all()
    sum = 0
    for i in meal_db:
        sum += i.rating
    if len(meal_db) == 0:
        return flask.jsonify({"rating": 0})

    return flask.jsonify({"rating": sum / len(meal_db)})


@app.route("/user_rating", methods=["POST"])
def user_rating():
    """[summary]"""
    meal = flask.request.json.get("userRating")
    food = flask.request.json.get("food")
    meal_db = Rating.query.filter_by(email=current_user.email, food=food).first()
    if meal_db is None:
        db.session.add(Rating(email=current_user.email, food=food, rating=meal))
        db.session.commit()
    else:
        meal_db.rating = meal
        db.session.commit()


@app.route("/get_comment", methods=["POST"])
def get_comment():
    """[summary]

    Returns:
        [type]: [description]
    """
    meal = flask.request.json.get("foodName")
    comment_db = Comment.query.filter_by(food=meal).all()
    email = []
    username = []
    comment = []
    result = list(zip(email, username, comment))
    if len(comment_db) == 0:
        return flask.jsonify({"comment": result})
    for i in comment_db:
        email.append(i.email)
        username.append(i.username)
        comment.append(i.comment)
    result = list(zip(email, username, comment))
    return flask.jsonify({"comment": result})


@app.route("/save_comment", methods=["POST"])
def save_comment():
    """[summary]"""
    email = flask.request.json.get("email")
    username = flask.request.json.get("username")
    comment = flask.request.json.get("comment")
    food = flask.request.json.get("food")
    db.session.add(Comment(email=email, username=username, food=food, comment=comment))
    db.session.commit()


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    """[summary]

    Args:
        path ([type]): [description]

    Returns:
        [type]: [description]
    """
    return flask.redirect(flask.url_for("bp.index"))


@app.route("/")
def main():
    """[summary]

    Returns:
        [type]: [description]
    """
    if current_user.is_authenticated:
        return flask.redirect(flask.url_for("bp.index"))
    return flask.redirect(flask.url_for("login"))


# When running locally, comment out host and port
# When deploying to Heroku, comment out ssl_context
# If using chrome, go to link 'chrome://flags/#allow-insecure-localhost' and toggle
app.run(
    # ssl_context="adhoc"
    host=os.getenv("IP", "0.0.0.0"),
    port=int(os.getenv("PORT", 8081)),
)
