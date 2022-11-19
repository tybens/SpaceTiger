import os

import sqlalchemy
import sqlalchemy.orm

import models

# -----------------------------------------------------------------------
DATABASE_URL = os.getenv("TEST_DB_URL")
engine = sqlalchemy.create_engine(DATABASE_URL)

# -----------------------------------------------------------------------


def get_spaces():
    with sqlalchemy.orm.Session(engine) as session:
        space_query = session.query(models.Space)
        amenities_query = session.query(models.Amenities)
        photos_query = session.query(models.Photos)

        spaces = space_query.all()
        amenities = amenities_query.all()
        photos = photos_query.all()

        data = {
            "spaces": spaces,
            "amenities": amenities,
            "photos": photos
        }

        return data

        # return spaces

        # print("hi")

        # friendly_spaces = []
        # # friendly_photos = []
        # # friendly_amenities = []

        # for space in spaces:
        #     friendly_photos = []
        #     friendly_amenities = []

        #     photos = (
        #         session.query(models.Photos)
        #         .filter(models.Photos.space_id == space.id)
        #         .all()
        #     )
        #     amenities = (
        #         session.query(models.Amenities)
        #         .filter(models.Amenities.space_id == space.id)
        #         .all()
        #     )
        #     for photo in photos:
        #         friendly_photos.append(photo.to_json())
        #     for amenity in amenities:
        #         friendly_amenities.append(amenity.to_json())

        #     # print("amenities", friendly_amenities)
        #     # print(space.to_json())

        #     space_json = space.to_json()

        #     space = {
        #         "space": space_json,
        #         # "space": space.to_json(),
        #         "amenities": friendly_amenities
        #     }

        #     # print("space", space)

        #     friendly_spaces.append(space)

        #     # print("photos", friendly_photos)
        #     # print("amenities", friendly_amenities)
        #     # friendly_spaces.append({
        #     #     "space": space.to_json(),
        #     #     "photos": friendly_photos,
        #     #     "amenities": friendly_amenities
        #     # })

        # print("ended loop")
        # print("amenities", friendly_amenities)
        # print("spaces", friendly_spaces)
        # print("spaces", friendly_spaces)
        # print("photos", friendly_photos)
        # print("amenities", friendly_amenities)
    # return friendly_spaces
    return []


def get_space(name):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Space).filter(models.Space.name == name)
        spaces = query.all()

        friendly_spaces = []
        friendly_photos = []
        friendly_amenities = []

        for space in spaces:
            photos = (
                session.query(models.Photos)
                .filter(models.Photos.space_id == space.id)
                .all()
            )
            amenities = (
                session.query(models.Amenities)
                .filter(models.Amenities.space_id == space.id)
                .all()
            )
            for photo in photos:
                friendly_photos.append(photo.to_json())
            for amenity in amenities:
                friendly_amenities.append(amenity.to_json())
            friendly_spaces.append({
                "space": space.to_json(),
                "photos": friendly_photos,
                "amenities": amenities
            })
    return friendly_spaces


def get_details(id):
    with sqlalchemy.orm.Session(engine) as session:
        space = session.query(models.Space).get(id)
        reviews = (
            session.query(models.Reviews)
            .filter(models.Reviews.space_id == space.id)
            .all()
        )
        photos = (
            session.query(models.Photos)
            .filter(models.Photos.space_id == space.id)
            .all()
        )
        amenities = (
            session.query(models.Amenities)
            .filter(models.Amenities.space_id == space.id)
            .all()
        )

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
            "space": friendly_space,
            "reviews": friendly_reviews,
            "photos": friendly_photos,
            "amenities": friendly_amenities,
        }
    return details


def get_user(puid):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Users).filter(models.Users.puid == puid)
        table = query.all()

    return table


def post_user(puid):
    ret = ""
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Users).filter(models.Users.puid == puid)
        table = query.all()
        if table:
            ret = "puid already in db"
        else:
            new_user = models.Users(puid=puid)
            session.add(new_user)
            session.commit()
            ret = "user created"

    return ret

# returns spaces that are favorited
def get_favorites(puid):
    with sqlalchemy.orm.Session(engine) as session:
        table = session.query(models.Favorites).filter(models.Favorites.user_id == puid).all()
        # table is a list of {space_id: space_id}
        print(table)
        space_ids = [t.space_id for t in table]
        # query for all spaces that match a space_id
        table = session.query(models.Space).filter(models.Space.id.in_(space_ids)).all()
    return table


# returns whether or not a user has favorited a specific space
def get_favorite(puid, space_id):
    with sqlalchemy.orm.Session(engine) as session:
        table = (
            session.query(models.Favorites)
            .filter(
                models.Favorites.user_id == puid, models.Favorites.space_id == space_id
            )
            .all()
        )
    return len(table) == 1


def post_favorite(puid, space_id):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Favorites).filter(
            models.Favorites.user_id == puid, models.Favorites.space_id == space_id
        )
        table = query.all()
        if table:
            # item is already favorited, unfavorite it
            query.delete(synchronize_session=False)
            ret = "space already favorited, removing from table"
        else:
            new_fav = models.Favorites(user_id=puid, space_id=space_id)
            session.add(new_fav)
            ret = f"favorited space with spaceid={space_id}"
        session.commit()

    return ret


# -----------------------------------------------------------------------


def _test():
    spaces = get_spaces()
    for space in range(10):
        print(spaces[space])

    print("-" * 25)

    spaces = get_space("Aaron Burr Hall 219")
    for space in spaces:
        print(space)

    print("-" * 25)

    details = get_details(3)
    print(details)

    print("-" * 25)
    user = get_user("tb19")
    print(user)

    print("-" * 25)
    ret = post_user("tb19")
    print(ret)

    print("-" * 25)
    spaces = get_favorites("tb19")
    print(spaces)

    print("-" * 25)
    ret = post_favorite("tb19", 0)
    print(ret)

    print("THIS IS GET SPACE: SPACE IS Aaron Burr Hall 219")
    for space in spaces:
        print(space)


# -----------------------------------------------------------------------

if __name__ == "__main__":
    _test()
