import datetime
from flask import Flask, jsonify
from flask_cors import CORS
from errors import init_handler

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)

CORS(app) # This will enable CORS for all routes
init_handler(app) # initialise error handling

# Route for seeing a data
@app.route('/data')
def get_time():

    # Returning an api for showing in reactjs
    return jsonify({'Name': "geek",
        "Age": "22",
        "Date": x,
        "programming": "python"
    })
# Running app
if __name__ == '__main__':
    app.run(debug=True)
