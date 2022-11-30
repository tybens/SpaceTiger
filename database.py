import os

import sqlalchemy
import sqlalchemy.orm

import cloudinary 
import cloudinary.uploader

import models

# ----------------------------------------------------------------------

DATABASE_URL = os.getenv("TEST_DB_URL")
engine = sqlalchemy.create_engine(DATABASE_URL)

# ----------------------------------------------------------------------

def get_spaces():
    with sqlalchemy.orm.Session(engine) as session:
        space_query = session.query(models.Space).filter(models.Space.approved == "true")
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


def add_space(puid, name, capacity, location, type, approved=False):
    return_id = None

    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Space).filter(
            models.Space.user_id == puid, models.Space.name == name
        )
        table = query.all()

        if table:
            return f"space with name {name} already exists"

        new_space = models.Space(
            user_id=puid, name=name, numreviews=0, capacity=capacity,
            rating=0, numvisits=0, location=location, type=type,
            approved=approved
        )
        session.add(new_space)
        session.commit()
        return_id = new_space.id

    return return_id


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

# returns spaces created by a specific user
def get_user_spaces(puid):
    with sqlalchemy.orm.Session(engine) as session:
        # query for all spaces that match a user_id
        table = session.query(models.Space).filter(models.Space.user_id == puid).all()
    return table


def get_locations():
    with sqlalchemy.orm.Session(engine) as session:
        table = session.query(models.Space.location).distinct().all()

    locations = [location for (location,) in table]
    return locations


def get_types():
    with sqlalchemy.orm.Session(engine) as session:
        table = session.query(models.Space.type).distinct().all()

    # some of the EMS location types have hyphens, so we'll remove them
    # here, but they should really be removed when seeding
    types = [type.split(" - ")[0] for (type,) in table]
    return list(set(types)) # keep only unique types

# ----------------------------------------------------------------------

def get_user(puid):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.User).filter(models.User.puid == puid)
        table = query.all()

    return table


def post_user(puid):
    ret = ""
    admins = ["tb19", "chenhanz", "evesely", "tbegum", "tgdinh"]
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.User).filter(models.User.puid == puid)
        table = query.all()
        if table:
            ret = "puid already in db"
        else:
            if puid in admins:
                new_user = models.User(puid=puid, admin=True)
            else:
                new_user = models.User(puid=puid)
            
            session.add(new_user)
            session.commit()
            ret = "user created"

    return ret

# ----------------------------------------------------------------------
# Functions for favoriting
# ----------------------------------------------------------------------

# returns spaces that are favorited
def get_favorites(puid):
    with sqlalchemy.orm.Session(engine) as session:
        table = session.query(models.Favorite).filter(models.Favorite.user_id == puid).all()
        # table is a list of {space_id: space_id}
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

# -----------------------------------------------------
# Functions for moderation
# -----------------------------------------------------

def get_awaiting_approval():
    with sqlalchemy.orm.Session(engine) as session:
        # models.Space.approved is False doesn't work, but == False does:
        query = session.query(models.Space).filter(models.Space.approved == False)
        table = query.all()
    return table

def check_user_admin(user_id):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.User).filter(models.User.puid == user_id)
        table = query.all()
    if table:
        return table[0].admin
    else:
        return False
    

def handle_approval(space_id, approval):
    if approval:
        with sqlalchemy.orm.Session(engine) as session:
            space = session.query(models.Space).get(space_id)
            space.approved = True
            ret = f"space {space.name} approved"
            session.commit()
    else:
        remove_space(space_id)
        ret = f"space {space_id} deleted"
    return ret

# -----------------------------------------------------
# Functions for reviews
# -----------------------------------------------------

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


# add a review consisting of rating and content
def add_review(space_id, puid, rating, content, noise, light, productivity, cleanliness, amenities_rating):
    review_id = None
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Review).filter(
            models.Review.space_id == space_id, models.Review.user_id == puid
        )
        table = query.all()

        new_review = models.Review(
            space_id=space_id, user_id=puid, rating=rating, 
            content=content, noise=noise, light=light,
            productivity=productivity, cleanliness=cleanliness, 
            amenities_rating=amenities_rating
        )
        session.add(new_review)
        ret = f"created review for space {space_id} by user {puid} with "
        ret += f"rating {rating} and content: {content}"

        session.commit()
        print(ret)
        review_id = new_review.id
        

    return review_id


# update a review for space with space_id by user with id of puid
def update_review(review_id, dict_of_changes):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Review).filter(
            models.Review.id == review_id
        )
        table = query.all()

        if table:
            query.update(dict_of_changes, synchronize_session=False)
            ret = f"review with id '{review_id}' updated"

        session.commit()

    return ret


# delete a review for space with space_id created by user specified by puid
def remove_review(review_id):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Review).filter(
            models.Review.id == review_id
        )
        table = query.all()

        if table:
            query.delete(synchronize_session=False)
            ret = f"deleted review with id {review_id}"
        else:
            ret = f"review with id {review_id} does not exist"

        session.commit()

    return ret

# ----------------------------------------------------------------------

def get_tags():
    with sqlalchemy.orm.Session(engine) as session:
        table = session.query(models.Tag.tag).distinct().all()

    tags = [tag for (tag,) in table]
    return tags


def add_tag(tag, space_id=None, review_id=None):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Tag).filter(
            models.Tag.space_id == space_id, models.Tag.tag == tag
        )
        table = query.all()

        new_tag = models.Tag(space_id=space_id, review_id=review_id, tag=tag)
        session.add(new_tag)
        ret = f"added tag '{tag}' for space with id {space_id}"

        session.commit()
        print(ret)

    return ret

def remove_tag(tag_id):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Tag).filter(models.Tag.id == tag_id)
        table = query.first()

        if table:
            query.delete(synchronize_session=False)
            ret = f"deleted tag with id {tag_id}"
        else:
            ret = f"tag with id {tag_id} does not exist"

        session.commit()
        print(ret)

    return ret

# ----------------------------------------------------------------------

def get_amenities():
    with sqlalchemy.orm.Session(engine) as session:
        table = session.query(models.Amenity.amenity).distinct().all()

    amenities = [amenity for (amenity,) in table]
    return amenities


def add_amenity(amenity, space_id=None, review_id=None):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Amenity).filter(
            models.Amenity.space_id == space_id, models.Amenity.amenity == amenity
        )
        table = query.all()

        if table:
            ret = f"amenity '{amenity}' for space with id {space_id} already exists"
        else:
            new_amenity = models.Amenity(space_id=space_id, review_id=review_id, amenity=amenity)
            session.add(new_amenity)
            ret = f"added amenity '{amenity}' for space with id {space_id}"

        session.commit()
        print(ret)

    return ret


def remove_amenity(amenity_id):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Amenity).filter(models.Amenity.id == amenity_id)
        table = query.first()

        if table:
            query.delete(synchronize_session=False)
            ret = f"deleted amenity with id {amenity_id}"
        else:
            ret = f"amenity with id {amenity_id} does not exist"

        session.commit()
        print(ret)

    return ret

# ----------------------------------------------------------------------
def upload_photo_to_cloudinary(src):
    cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), api_key=os.getenv('CLOUD_API_KEY'), 
        api_secret=os.getenv('CLOUD_API_SECRET'))
    upload_result = cloudinary.uploader.upload(src, resource_type="raw", folder="SpaceTiger/photos/")
    return upload_result['url']

    
def add_photo(space_id, src, review_id=None):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Photo).filter(
            models.Photo.space_id == space_id, models.Photo.src == src
        )
        table = query.all()

        if table:
            ret = f"photo with given src for space with id {space_id} already exists"
        else:
            new_photo = models.Photo(space_id=space_id, review_id=review_id, src=src)
            session.add(new_photo)
            ret = f"added photo with given src for space with id {space_id}"

        session.commit()

    return ret


def remove_photo(photo_id):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Photo).filter(models.Photo.id == photo_id)
        table = query.first()

        if table:
            query.delete(synchronize_session=False)
            ret = f"deleted photo with id {photo_id}"
        else:
            ret = f"photo with id {photo_id} does not exist"

        session.commit()

    return ret

# ----------------------------------------------------------------------

def _test_spaces():
    print("-" * 25)
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
    spaces = get_user_spaces("tbegum")
    print(spaces)

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

    print("-" * 25)
    locations = get_locations()
    print(locations)

    print("-" * 25)
    types = get_types()
    print(types)


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
    # ret = add_review(999, "tbegum", 5, "Really love this room for studying")
    # print(ret)
    # ret = add_review(1000, "tbegum", 2, "This space could use some cleaning")
    # print(ret)

    # TODO: Update this call to use dict_of_changes
    # print("-" * 25)
    # ret = update_review(1000, "tbegum", 1, "This space has become so gross")
    # print(ret)

    print("-" * 25)
    user_reviews = get_user_reviews("tbegum")
    print(user_reviews)

    print("-" * 25)
    user_reviews = get_space_reviews(999)
    print(user_reviews)

    print("-" * 25)
    ret = remove_review(77)
    print(ret)
    ret = remove_review(78)
    print(ret)


def _test_tags():
    print("-" * 25)
    ret = add_tag(tag="Cozy", space_id=0)
    print(ret)

    print("-" * 25)
    ret = add_tag(tag="Social", space_id=0)
    print(ret)

    print("-" * 25)
    tags = get_tags()
    print(tags)


def _test_amenities():
    print("-" * 25)
    ret = add_amenity(amenity="Dummy Amenity 1", space_id=999)
    print(ret)
    ret = add_amenity(amenity="Dummy Amenity 2", space_id=999)
    print(ret)

    print("-" * 25)
    amenities = get_amenities()
    print(amenities)

    print("-" * 25)
    ret = remove_amenity(5184)
    print(ret)


def _test_photos():
    print("-" * 25)
    ret = add_photo(999, src="https://images.unsplash.com/photo-1668934807804-908534048c4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80")
    print(ret)

    print("-" * 25)
    ret = remove_photo(1394)
    print(ret)

# ----------------------------------------------------------------------

if __name__ == "__main__":
    _test_spaces()
    _test_users()
    _test_favorites()
    _test_reviews()
    _test_tags()
    _test_amenities()
    _test_photos()
