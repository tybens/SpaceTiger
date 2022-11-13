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
from database import get_favorites, get_spaces, get_details, get_favorite, post_favorite
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


@app.route("/getspacedetails")
def get_space_details():
    id = request.args.get("id")
    data = get_details(id)
    # print(data)
    return jsonify(data)
    # return jsonify(data)

@app.route('/getfavorite')
def get_is_favorite():
    user_id = request.args.get('user_id')
    space_id = request.args.get('space_id')
    
    return jsonify({"is_favorite": get_favorite(user_id, space_id)})
    
@app.route('/postfavorite')
def post_is_favorite():
    user_id = request.args.get('user_id')
    space_id = request.args.get('space_id')
    if not user_id or not space_id:
        return jsonify({"status": 400, "response": "error: invalid parameters in request"})
        
    try:
        res = post_favorite(user_id, space_id)
        return jsonify({"status": 200, "response": res})
    except Exception as err:
        return jsonify({"status": 500, "response": err})
    
@app.route('/getfavorites')
def get_list_favorites():
    user_id = request.args.get('user_id')
    data = get_favorites(user_id)
    
    return jsonify(items=[i.to_json() for i in data])

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
    app.run(host="0.0.0.0", port=8000)
