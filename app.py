# https://towardsdatascience.com/build-deploy-a-react-flask-app-47a89a5d17d9
import os

from flask import (
    Flask,
    redirect,
    send_from_directory,
    jsonify,
    request,
)
from flask_restful import Api
from flask_cors import CORS
from api.HelloApiHandler import HelloApiHandler


from errors import init_handler
# from query_test import get_books
from database import get_spaces
import auth

app = Flask(__name__, static_url_path="", static_folder="frontend/build")

if "FLASK_ENV" in os.environ and os.environ.get("FLASK_ENV") == "development":
    CORS(app)
    # init_handler(app) 1 # initialise error handling

api = Api(app)
app.secret_key = os.environ["APP_SECRET_KEY"]


@app.route("/", defaults={"path": ""})
def serve(path):
    return send_from_directory(app.static_folder, "index.html")


# needs to work with react router


@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, "index.html")


api.add_resource(HelloApiHandler, "/flask/hello")

# Route for seeing a data

@app.route("/getspaces")
def get_data():
    data = get_spaces()
    return jsonify(items=[i.to_json() for i in data])



# @app.route("/data")
# def get_data():
#     isbn = request.args.get("isbn")
#     table = get_books(isbn)
#     # Returning an api for showing in reactjs
#     return jsonify(
#         {"isbn": table[0].isbn, "title": table[0].title, "quantity": table[0].quantity}
#     )


# Routes for authentication.
@app.route("/logout", methods=["GET"])
def logout():
    return auth.logout()


@app.route("/login", methods=["GET"])
def login():
    auth.authenticate()  # sets session variable

    return redirect("/loginredirect")


@app.route("/user_logged_in", methods=["GET"])
def user_logged_in():
    username = auth.authenticate()

    return jsonify({"netid": username})


if __name__ == "__main__":
    app.run()
