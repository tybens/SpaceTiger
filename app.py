# https://towardsdatascience.com/build-deploy-a-react-flask-app-47a89a5d17d9
import os

from flask import (
    Flask,
    redirect,
    send_from_directory,
    jsonify,
    request,
    session
)
from flask_restful import Api
from flask_cors import CORS

from api.spaces import SpacesApi
from api.reviews import ReviewsApi
import database as db
import auth

# ----------------------------------------------------------------------

app = Flask(__name__, static_url_path="", static_folder="frontend/build")
app.secret_key = os.environ["APP_SECRET_KEY"]
if "FLASK_ENV" in os.environ and os.environ.get("FLASK_ENV") == "development":
    CORS(app)

api = Api(app)

# ---------------------------------------------
# Routes for index and errors.
# ---------------------------------------------

@app.route("/", defaults={"path": ""})
def serve(path):
    return send_from_directory(app.static_folder, "index.html")


@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, "index.html")

# ---------------------------------------------
# Routes for spaces.
# ---------------------------------------------

api.add_resource(SpacesApi, "/spaces", "/spaces/<space_id>")

@app.route('/locations')
def locations():
    return jsonify({"locations": db.get_locations()})

@app.route('/types')
def types():
    return jsonify({"types": db.get_types()})

# ---------------------------------------------
# Routes for reviews.
# ---------------------------------------------

api.add_resource(ReviewsApi, "/reviews", "/reviews/<review_id>")

# ---------------------------------------------
# Routes for amenities.
# ---------------------------------------------

@app.route('/amenities')
def amenities():
    return jsonify({"amenities": db.get_amenities()})

# ---------------------------------------------
# Routes for tags.
# ---------------------------------------------

@app.route('/tags')
def tags():
    return jsonify({"tags": db.get_tags()})

# ---------------------------------------------
# Routes for favorites.
# ---------------------------------------------

@app.route('/getfavorite')
def get_is_favorite():
    user_id = request.args.get('user_id')
    space_id = request.args.get('space_id')

    return jsonify({"is_favorite": db.get_favorite(user_id, space_id)})


@app.route('/postfavorite')
def post_is_favorite():
    user_id = request.args.get('user_id')
    space_id = request.args.get('space_id')
    if not user_id or not space_id:
        return jsonify({"status": 400, "response": "error: invalid parameters in request"})

    try:
        res = db.post_favorite(user_id, space_id)
        return jsonify({"status": 200, "response": res})
    except Exception as err:
        return jsonify({"status": 500, "response": err})


# ---------------------------------------------
# Routes for Profile page.
# ---------------------------------------------


@app.route('/getfavorites')
def get_list_favorites():
    user_id = request.args.get('user_id')
    data = db.get_favorites(user_id)

    return jsonify(data)
# ---------------------------------------------
# API: for moderation
# ---------------------------------------------

@app.route('/getawaitingapproval')
def get_awaiting_approval():
    data = db.get_awaiting_approval()

    return jsonify(data)


@app.route('/approve')
def handle_approve():
    
    space_id = request.args.get('space_id')
    approval = request.args.get('approval') == "true"
    admin = db.check_user_admin()
    if admin:
        ret = db.handle_approval(space_id, approval)
    else:
        ret = "user isn't admin, operation disallowed"

    return jsonify({"response": ret})

# ---------------------------------------------
# Routes for authentication.
# ---------------------------------------------

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
    return jsonify({"netid": username, "admin": db.check_user_admin()})

# ----------------------------------------------------------------------

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
