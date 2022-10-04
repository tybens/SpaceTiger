# https://towardsdatascience.com/build-deploy-a-react-flask-app-47a89a5d17d9
import os

from flask import Flask, send_from_directory, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from api.HelloApiHandler import HelloApiHandler

from errors import init_handler

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
if 'FLASK_ENV' in os.environ and os.environ.get('FLASK_ENV') == 'development':
    CORS(app) #comment this on deployment
    init_handler(app) # initialise error handling

api = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
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