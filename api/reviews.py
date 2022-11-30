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
        parser.add_argument("noisiness", type=int)
        parser.add_argument("light", type=int)
        parser.add_argument("productivity", type=int)
        parser.add_argument("cleanliness", type=int)
        parser.add_argument("amenities_rating", type=int)
        parser.add_argument("tags", action="append", type=str)
        parser.add_argument("amenities", action="append", type=str)

        args = parser.parse_args()

        review_id = database.add_review(
            space_id=args["space_id"],
            puid=args["puid"],
            rating=args["rating"],
            content=args["content"],
            noise=args["noisiness"],
            light=args["light"],
            productivity=args["productivity"],
            cleanliness=args['cleanliness'],
            amenities_rating=args['amenities_rating']
        )

        for amenity in args["amenities"]:
            database.add_amenity(amenity=amenity, space_id=None, review_id=review_id)

        for tag in args["tags"]:
            database.add_tag(tag=tag, space_id=None, review_id=review_id)

    def put(self, review_id):
        dict_of_changes = json.loads(request.data)
        return database.update_review(review_id, dict_of_changes)

    def delete(self, review_id):
        return database.remove_review(review_id)
