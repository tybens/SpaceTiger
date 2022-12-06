from flask import json, request, jsonify, session
from flask_restful import Resource, reqparse

import database

# ----------------------------------------------------------------------
class ReportsApi(Resource):
    def get(self):
        data = database.get_reports()
        return jsonify(data)

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("review_id", type=int)
        parser.add_argument("content", type=str)

        args = parser.parse_args()

        review_id = database.add_review(
            review_id=args["review_id"],
            content=args["content"],
        )
        return review_id

    def delete(self, report_id):
        if "username" in session:
            user_id = session.get("username")
        admin = database.check_user_admin()

        return database.delete_report(report_id, user_id, admin)
