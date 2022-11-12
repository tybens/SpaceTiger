import os

import sqlalchemy
import sqlalchemy.orm

import models

#-----------------------------------------------------------------------

DATABASE_URL = os.getenv("TEST_DB_URL")
engine = sqlalchemy.create_engine(DATABASE_URL)

#-----------------------------------------------------------------------

def get_spaces():
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Space)
        print(query)
        table = query.all()

    return table

def get_space(name):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Space).filter(
            models.Space.name == name)
        table = query.all()

    return table

def get_details(id):
    with sqlalchemy.orm.Session(engine) as session:
        space = session.query(models.Space).get(id).all()
        reviews = session.query(models.Reviews).filter(models.Reviews.space_id == space.id).all()
        photos = session.query(models.Photos).filter(models.Photos.review_id == reviews.id).all()
        amenities = session.query(models.Amenities).filter(models.Amenities.review_id == reviews.id).all()

        details = {
            'space': space,
            'reviews': reviews,
            'photos': photos,
            "amenities": amenities
        }
    return details

"""""
def get_spaces(query):
        with sqlalchemy.orm.Session(engine) as session:
            queryresults = []
            for key in query:
                queryresult.append = 
                if (query[key] == ('' or None)):
                    

            queryresult = session.query(models.Space).filter(
                models.Space.id.ilike(f"%{query[user_id]),
                models.Space.user_id.ilike(f"%{query[user_id]}%"),
                models.Space.name.ilike(f"%{query[name]}%"),
                models.Space.type.ilike(f"%{query[type]}%"),
                models.Space.location.ilike(f"%{query[location]}%"),
                models.Space.capacity.ilike(f"%{query[capacity]}%"),
                models.Space.numreviews.ilike(f"%{query[numreviews]}%"),
                models.Space.rating.ilike(f"%{query[rating]}%"),
                models.Space.numvisits.ilike(f"%{query[numvisits]}%")
            )
            return queryresult
"""

#-----------------------------------------------------------------------

def _test():
    spaces = get_space("Aaron Burr Hall 219")
    for space in spaces:
        print(space)

#-----------------------------------------------------------------------

if __name__ == '__main__':
    _test()