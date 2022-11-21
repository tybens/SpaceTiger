from flask import json, request
from flask_restful import Resource, reqparse

import database

# ----------------------------------------------------------------------

class ReviewsApi(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("space_id", type=int)
        parser.add_argument("puid", type=str)
        parser.add_argument("rating", type=int)
        parser.add_argument("content", type=str)
        args = parser.parse_args()
        
        return database.add_review(args["space_id"], args["puid"],
            args["rating"], args["content"])

    def put(self, review_id):
        dict_of_changes = json.loads(request.data)
        return database.update_review(review_id, dict_of_changes)

    def delete(self, review_id):
        return database.remove_review(review_id)
