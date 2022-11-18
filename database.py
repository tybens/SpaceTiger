import os

import sqlalchemy
import sqlalchemy.orm

import models

# ----------------------------------------------------------------------

DATABASE_URL = os.getenv("TEST_DB_URL")
engine = sqlalchemy.create_engine(DATABASE_URL)

# ----------------------------------------------------------------------

def get_spaces():
    with sqlalchemy.orm.Session(engine) as session:
        space_query = session.query(models.Space)
        amenities_query = session.query(models.Amenity)
        photos_query = session.query(models.Photo)

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
        #         session.query(models.Photo)
        #         .filter(models.Photo.space_id == space.id)
        #         .all()
        #     )
        #     amenities = (
        #         session.query(models.Amenity)
        #         .filter(models.Amenity.space_id == space.id)
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
        table = query.first()

    return table


def get_details(id):
    with sqlalchemy.orm.Session(engine) as session:
        space = session.query(models.Space).get(id)
        reviews = (
            session.query(models.Review)
            .filter(models.Review.space_id == space.id)
            .all()
        )
        photos = (
            session.query(models.Photo)
            .filter(models.Photo.space_id == space.id)
            .all()
        )
        amenities = (
            session.query(models.Amenity)
            .filter(models.Amenity.space_id == space.id)
            .all()
        )

        friendly_space = space.to_json()
        friendly_reviews = []
        friendly_photos = []
        friendly_amenities = []

        for review in reviews:
            friendly_reviews.append(review.to_json())

        for photo in photos:
            friendly_photos.append(photo.to_json())

        for amenity in amenities:
            friendly_amenities.append(amenity.to_json())

        details = {
            "space": friendly_space,
            "reviews": friendly_reviews,
            "photos": friendly_photos,
            "amenities": friendly_amenities,
        }
    return details


def add_space(puid, name, capacity, location, type):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Space).filter(
            models.Space.user_id == puid, models.Space.name == name
        )
        table = query.all()

        if table:
            ret = f"space with name {name} already exists"
        else:
            new_space = models.Space(
                user_id=puid, name=name, numreviews=0, capacity=capacity,
                rating=0, numvisits=0, location=location, type=type
            )
            session.add(new_space)
            ret = f"created space with name: {name}"

        session.commit()

    return ret


def update_space(space_id, dict_of_changes):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Space).filter(
            models.Space.id == space_id
        )
        table = query.all()

        if table:
            query.update(dict_of_changes, synchronize_session=False)
            ret = f"space with id '{space_id}' updated"

        session.commit()

    return ret


def remove_space(space_id):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Space).filter(
            models.Space.id == space_id
        )
        table = query.all()

        if table:
            query.delete(synchronize_session=False)
            ret = f"deleted space with id {space_id}"
        else:
            ret = f"space with id {space_id} does not exist"

        session.commit()

    return ret

# ----------------------------------------------------------------------

def get_user(puid):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.User).filter(models.User.puid == puid)
        table = query.all()

    return table


def post_user(puid):
    ret = ""
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.User).filter(models.User.puid == puid)
        table = query.all()
        if table:
            ret = "puid already in db"
        else:
            new_user = models.User(puid=puid)
            session.add(new_user)
            session.commit()
            ret = "user created"

    return ret

# ----------------------------------------------------------------------

# returns spaces that are favorited
def get_favorites(puid):
    with sqlalchemy.orm.Session(engine) as session:
        table = session.query(models.Favorite).filter(models.Favorite.user_id == puid).all()
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
            session.query(models.Favorite)
            .filter(
                models.Favorite.user_id == puid, models.Favorite.space_id == space_id
            )
            .all()
        )
    return len(table) == 1


def post_favorite(puid, space_id):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Favorite).filter(
            models.Favorite.user_id == puid, models.Favorite.space_id == space_id
        )
        table = query.all()
        if table:
            # item is already favorited, unfavorite it
            query.delete(synchronize_session=False)
            ret = "space already favorited, removing from table"
        else:
            new_fav = models.Favorite(user_id=puid, space_id=space_id)
            session.add(new_fav)
            ret = f"favorited space with spaceid={space_id}"
        session.commit()

    return ret

# ----------------------------------------------------------------------

# get the reviews associated with a space specified by space_id
def get_space_reviews(space_id):
    with sqlalchemy.orm.Session(engine) as session:
        table = session.query(models.Review).filter(
            models.Review.space_id == space_id
        ).all()
    return table


# get the reviews created by a user specified by puid
def get_user_reviews(puid):
    with sqlalchemy.orm.Session(engine) as session:
        table = session.query(models.Review).filter(
            models.Review.user_id == puid
        ).all()
    return table


# add a review consisting of rating and content, or update a review if it
# already exists for space with space_id by user specified by puid
def post_review(space_id, puid, rating, content):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Review).filter(
            models.Review.space_id == space_id, models.Review.user_id == puid
        )
        table = query.all()

        if table: # if review already exists, then update it
            query.update({"rating": rating, "content": content},
                synchronize_session=False)
            ret = f"user {puid} review for this space {space_id} already exists"
            ret += f"\nupdating their review with rating {rating} and content:"
            ret += f"\n{content}"
        else:
            new_review = models.Review(
                space_id=space_id, user_id=puid, rating=rating, content=content
            )
            session.add(new_review)
            ret = f"created review for space {space_id} by user {puid} with "
            ret += f"rating {rating} and content:\n{content}"

        session.commit()

    return ret


# delete a review for space with space_id created by user specified by puid
def remove_review(space_id, puid):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Review).filter(
            models.Review.space_id == space_id, models.Review.user_id == puid
        )
        table = query.all()

        if table:
            query.delete(synchronize_session=False)
            ret = f"deleted review by user {puid} for space {space_id}"
        else:
            ret = f"review by user {puid} for space {space_id} does not exist"

        session.commit()

    return ret

# ----------------------------------------------------------------------

def _test_spaces():
    details = get_details(1) # works best once the database is seeded
    print(details)

    print("-" * 25)
    ret = add_space("tbegum", "Scully 3rd Floor Common Area", 10, "Scully Hall", "Lounge")
    print(ret)
    ret = add_space("tbegum", "Scully 4th Floor Study Room", 15, "Scully Hall", "Study Room")
    print(ret)

    print("-" * 25)
    space = get_space("Scully 3rd Floor Common Area")
    print(space)

    print("-" * 25)
    ret = update_space(space.id, {"capacity": 15})
    print(ret)

    print("-" * 25)
    spaces = get_spaces()["spaces"]
    print(spaces[:10])

    print("-" * 25)
    ret = remove_space(space.id)
    print(ret)
    space = get_space("Scully 4th Floor Study Room")
    ret = remove_space(space.id)
    print(ret)


def _test_users():
    print("-" * 25)
    user = get_user("tb19")
    print(user)

    print("-" * 25)
    ret = post_user("tb19")
    print(ret)


def _test_favorites():
    print("-" * 25)
    spaces = get_favorites("tb19")
    print(spaces)

    print("-" * 25)
    ret = post_favorite("tb19", 0)
    print(ret)


def _test_reviews():
    print("-" * 25)
    ret = post_review(999, "tbegum", 5, "Really love this room for studying")
    print(ret)
    ret = post_review(1000, "tbegum", 2, "This space could use some cleaning")
    print(ret)

    print("-" * 25)
    ret = post_review(1000, "tbegum", 1, "This space has become so gross")
    print(ret)

    print("-" * 25)
    user_reviews = get_user_reviews("tbegum")
    print(user_reviews)

    print("-" * 25)
    user_reviews = get_space_reviews(999)
    print(user_reviews)

    print("-" * 25)
    ret = remove_review(999, "tbegum")
    print(ret)
    ret = remove_review(1000, "tbegum")
    print(ret)

# ----------------------------------------------------------------------

if __name__ == "__main__":
    _test_spaces()
    _test_users()
    _test_favorites()
    _test_reviews()
