from flask import jsonify, json, request
import flask
from flask_restful import Resource, reqparse

import database

# ----------------------------------------------------------------------

class SpacesApi(Resource):
    def get(self, space_id=None):
        if space_id is None: # if space isn't specified, get all spaces
            data = database.get_spaces()
            spaces = [i.to_json() for i in data['spaces']]
            photos = [i.to_json() for i in data['photos']]
            amenities = [i.to_json() for i in data['amenities']]
            return jsonify({
                "spaces": spaces,
                "photos": photos,
                "amenities": amenities
            })

        data = database.get_details(space_id)
        return jsonify(data)

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("puid", type=str)
        parser.add_argument("name", type=str)
        parser.add_argument("capacity", type=int)
        parser.add_argument("location", type=str)
        parser.add_argument("type", type=str)
        parser.add_argument("images", type=str, action='append')
        
        args = parser.parse_args()            
        space_id = database.add_space(args["puid"], args["name"],
            args["capacity"], args["location"], args["type"])
        
        if (args['images']):
            for image in args['images']:
                url = database.upload_photo_to_cloudinary(image)
                database.add_photo(space_id, url, None)

        # for image in args['images']:
        #     url = database.upload_photo_to_cloudinary(image)
        #     database.add_photo(space_id, url, None)
            

    def put(self, space_id):
        dict_of_changes = json.loads(request.data)
        return database.update_space(space_id, dict_of_changes)

    def delete(self, space_id):
        return database.remove_space(space_id)
