# https://towardsdatascience.com/build-deploy-a-react-flask-app-47a89a5d17d9
import os
import database.py

from flask import Flask, render_template, send_from_directory, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from api.HelloApiHandler import HelloApiHandler


from errors import init_handler

app = Flask(__name__, static_url_path='', static_folder='frontend/build')

if 'FLASK_ENV' in os.environ and os.environ.get('FLASK_ENV') == 'development':
    CORS(app)
    init_handler(app) # initialise error handling

api = Api(app)

@app.route("/", defaults={'path':''})
# @app.route('/<path:path>')
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

# needs to work with react router
@app.errorhandler(404)
def not_found(e):
  return send_from_directory(app.static_folder,'index.html')

api.add_resource(HelloApiHandler, '/flask/hello')

# Route for seeing a data
@app.route('/data')
def get_time():
    # Returning an api for showing in reactjs
    return jsonify({'Name': "geek",
        "Age": "22",
        "Date": 'date',
        "programming": "python"
    })


if __name__ == "__main__":
    app.run()