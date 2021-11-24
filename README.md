## HealthyLifestyle

## Heroku deploy

Sprint 1: [http://polar-plains-74523.herokuapp.com/]
Sprint 2: [https://healthy-lifestyle-swe.herokuapp.com/]

## Libraries

- base 64
- requests
- os
- urlencode
- find_dotenv, load_dotenv
- flask
- random
- flask_login
- flask_sqlalchemy
- werkzeug.wrappers
- Sweet Alert 2
- React simple chatbot

## APIs

- Google OAuth API
- TheMealDB API
- Edamam API

## Tech Stacks

1. Front-end

- HTML
- CSS
- React Js
- Javascript
- React Bootstrap
- Node.js

2. Back-end

- Python flask

## Few notes on Google Login

- Our google login works locally fine with instructions to uncomment at the end of app.py.
- We haven't registered ssl on heroku so it doesn't allow to use google login so we comment out the that option in login.html.
- If you want to test locally, DM us so we can register your account as developer for testing, and comment out the line in login.html, follow instructions at the end of App.py

## Instruction to run my app

1. Go to VSCODE, create a new directory where you are going to clone the code. Open the terminal.
2. type git clone git@github.com:bryanchau11/HealthyLifestyle.git
3. npm install
4. pip install -r requirements.txt
5. follow this [https://gist.github.com/jomart-gsu/e3f11dd30c460910ddc30b72efc8b879] to set up heroku database.
6. before running the code, you will need the enviroment.
7. type "touch .env" then "code .env"
8. type "heroku config" to get your DATABASE_URL and set it to ".env" file.
9. Set the app secret key in .env, this key could be anything string-type.
10. For other key, such as RapidApi key and Google OAuth key, you need to find it by making an account on those website.
11. Run command in terminal (in your project directory): `npm run build`. This will update anything related to your `App.js` file (so `public/index.html`, any CSS you're pulling in, etc).
12. foward a new port of 8081
13. now run "python3 app.py" and you will see my app running on your browser.

## a. What are at least 3 technical issues you encountered with your project? How did you fix them?

- The first techical issue I encountered with was setting the React router to direct between pages and render correctly. I figured out by upgrading them to V6 version and followed the documents.
- I see that it takes an extra step to pass the query data to backend, then use Python and fetch result from the api and send back to the React js. So what I did was calling and fetching API purely on React using Node.js
- I feel it's hard to make the footer component stick to the end of the website, but still not figured out yet. So I took them away and planned to fix it during Sprint 2.

## b. What part of the stack do you feel most comfortable with? What part are you least comfortable with?

- I feel comportable with my perfect Chatbot and the styling FoodRecipe page with displaying comments and rating.
- Also I feel comfortable with react component, updating state and sending back data to back-end, plus utilizing most of the React library.
- The part I feel least comfortable with is mocked unit test and setup github action for testing since they do need to access variable from enviroment which is in gitignore. Therefore, they cause many errors to me, but they run locally fine.
