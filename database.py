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
        space = session.query(models.Space).get(id)
        reviews = session.query(models.Reviews).filter(models.Reviews.space_id == space.id).all()
        photos = session.query(models.Photos).filter(models.Photos.space_id == space.id).all()
        amenities = session.query(models.Amenities).filter(models.Amenities.space_id == space.id).all()

        friendly_space = space.to_json()
        friendly_reviews = []
        friendly_photos = []
        friendly_amenities = []
        
        for i, review in enumerate(reviews):
            friendly_reviews.append(review.to_json())

        for i, photo in enumerate(photos):
            friendly_photos.append(photo.to_json())

        for i, amenity in enumerate(amenities):
            friendly_amenities.append(amenity.to_json())

        details = {
            'space': friendly_space,
            'reviews': friendly_reviews,
            'photos': friendly_photos,
            'amenities': friendly_amenities
        }
    return details

#-----------------------------------------------------------------------

def _test():
    spaces = get_spaces()
    for space in range(10):
        print(spaces[space])

    print('')

    spaces = get_space("Aaron Burr Hall 219")
    for space in spaces:
        print(space)
    
    print('')
    
    details = get_details(1)
    for key in details:
        print(details[key])

#-----------------------------------------------------------------------

if __name__ == '__main__':
    _test()