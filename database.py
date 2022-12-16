from collections import defaultdict
import datetime
import os

import sqlalchemy
import sqlalchemy.orm

import cloudinary
import cloudinary.uploader

import models

from flask import session as sesh

# ----------------------------------------------------------------------

DATABASE_URL = os.getenv("TEST_DB_URL")
engine = sqlalchemy.create_engine(DATABASE_URL)

# ----------------------------------------------------------------------


def get_spaces():
    with sqlalchemy.orm.Session(engine) as session:
        space_query = session.query(models.Space).filter(
            models.Space.approved == "true"
        )
        photos_query = session.query(models.Photo)
        amenities_query = session.query(models.Amenity)

        spaces = [space.to_json() for space in space_query.all()]
        photos = [photo.to_json() for photo in photos_query.all()]
        amenities = [amenity.to_json() for amenity in amenities_query.all()]

        # add amenities to each space object. This runs
        # so much faster than iterating through in models.py
        hm = defaultdict(list)
        for amenity in amenities:
            if amenity["spaceid"]:
                hm[amenity["spaceid"]].append(amenity["amenity"])

        for space in spaces:
            space.update({"amenities": hm[space["id"]]})

        data = {"spaces": spaces, "photos": photos}

    return data


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
            session.query(models.Photo).filter(models.Photo.space_id == space.id).all()
        )
        amenities = (
            session.query(models.Amenity)
            .filter(models.Amenity.space_id == space.id)
            .all()
        )

        space = space.to_json()
        reviews = [review.to_json() for review in reviews]
        photos = [photo.to_json() for photo in photos]
        amenities = [amenity.to_json() for amenity in amenities]

        details = {
            "space": space,
            "reviews": reviews,
            "photos": photos,
            "amenities": amenities,
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
            # return existing space id
            return False, table[0].id

        new_space = models.Space(
            user_id=puid,
            name=name,
            capacity=capacity,
            location=location,
            type=type,
            approved=approved,
        )
        session.add(new_space)
        session.commit()
        return_id = new_space.id

    return True, return_id


def update_space(space_id, dict_of_changes):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Space).filter(models.Space.id == space_id)
        table = query.all()

        if table:
            query.update(dict_of_changes, synchronize_session=False)
            ret = f"space with id '{space_id}' updated"

        session.commit()

    return ret


def update_space_helper(
    space, rating, noisiness, privacy, lighting, cleanliness, amenities_rating, adding
):
    mapping = {
        "rating": rating,
        "noisiness": noisiness,
        "privacy": privacy,
        "lighting": lighting,
        "cleanliness": cleanliness,
        "amenities_rating": amenities_rating,
    }
    if space["numreviews"] is None or space["numreviews"] < 0:
        numreviews = 1
    else:
        if adding:
            numreviews = space["numreviews"] + 1
        else:
            numreviews = space["numreviews"] - 1

    for key, value in mapping.items():
        if value is not None:
            if numreviews <= 0:
                mapping[key] = None
            elif space[key]:
                # equation from https://stackoverflow.com/a/53618572/15561634
                old_avg = space[key]
                effect_of_val = (value - old_avg) / numreviews
                if adding:
                    mapping[key] = old_avg + effect_of_val
                else:
                    mapping[key] = old_avg - effect_of_val
            else:
                # if no previous average, start a new one
                mapping[key] = value

    return {
        "numreviews": numreviews,
        "rating": mapping["rating"],
        "avgnoise": mapping["noisiness"],
        "avgprivacy": mapping["privacy"],
        "avglighting": mapping["lighting"],
        "avgcleanliness": mapping["cleanliness"],
        "avgamenities": mapping["amenities_rating"],
    }


def update_space_from_review(
    space_id,
    rating,
    noisiness,
    privacy,
    lighting,
    cleanliness,
    amenities_rating,
    adding,
):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Space).filter(models.Space.id == space_id)
        table = query.all()
        space = table[0].to_json()

        dict_of_changes = update_space_helper(
            space,
            rating,
            noisiness,
            privacy,
            lighting,
            cleanliness,
            amenities_rating,
            adding,
        )

        if table:
            query.update(dict_of_changes, synchronize_session=False)
            ret = f"space with id '{space_id}' updated"

        session.commit()

    return ret


def remove_space(space_id):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Space).filter(models.Space.id == space_id)
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
        # table is a list of {space_id: space_id}
        space_ids = [t.id for t in table]
        # query for all spaces that match a space_id
        space_query = session.query(models.Space).filter(models.Space.id.in_(space_ids))
        photos_query = session.query(models.Photo).filter(
            models.Photo.space_id.in_(space_ids)
        )

        spaces = space_query.all()
        photos = photos_query.all()

        data = {
            "spaces": [item.to_json() for item in spaces],
            "photos": [item.to_json() for item in photos],
        }

    return data


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
    return list(set(types))  # keep only unique types


# ----------------------------------------------------------------------


def get_user(puid):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.User).filter(models.User.puid == puid)
        table = query.all()

    return table


def post_user(puid):
    ret = ""
    admins = ["tb19", "chenhanz", "evesely", "tbegum", "tgdinh", "xl2493", 'mtouil', 'daphnegb', 'dpw']
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
        table = (
            session.query(models.Favorite).filter(models.Favorite.user_id == puid).all()
        )
        # table is a list of {space_id: space_id}
        space_ids = [t.space_id for t in table]
        # query for all spaces that match a space_id
        space_query = session.query(models.Space).filter(models.Space.id.in_(space_ids))
        photos_query = session.query(models.Photo).filter(
            models.Photo.space_id.in_(space_ids)
        )

        spaces = space_query.all()
        photos = photos_query.all()

        data = {
            "spaces": [item.to_json() for item in spaces],
            "photos": [item.to_json() for item in photos],
        }

    return data


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
# Functions for report
# -----------------------------------------------------
# Get all reports in the database.
def get_reports():
    with sqlalchemy.orm.Session(engine) as session:
        table = session.query(models.Report).all()
        reports = [report.to_json() for report in table]

        space_ids = [rep["review"]["spaceid"] for rep in reports]
        spaces = (
            session.query(models.Space)
            .filter(models.Space.id.in_(space_ids))
            .with_entities(models.Space.id, models.Space.name)
            .all()
        )

        hm = {spaceid: space_name for (spaceid, space_name) in spaces}
        for report in reports:
            report.update({"space_name": hm[report["review"]["spaceid"]]})
        return reports


# Any user can add a report for a review (review_id)
def add_report(user_id=None, review_id=None, content=None):
    report_id = None
    date = datetime.datetime.now()

    with sqlalchemy.orm.Session(engine) as session:
        new_report = models.Report(
            user_id=user_id,
            review_id=review_id,
            content=content,
            date=date,
        )

        session.add(new_report)
        ret = f"created report for review {review_id} by user {user_id} with "
        ret += f"content: {content} at date: {date}"

        session.commit()
        print(ret)
        report_id = new_report.id

    return report_id


# A user (user_id) can delete a report for a review (review_id) if the user is admin
def delete_report(report_id, user_id, admin):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Report).filter(models.Report.id == report_id)
        table = query.all()

        # add verification for permissions on delete.
        if not table:
            ret = f"report with id {report_id} does not exist"
        elif admin:
            query.delete(synchronize_session=False)
            ret = f"deleted review with id {report_id}"
        else:
            ret = f"{user_id} has insufficient permissions to delete report with report_id {report_id}"

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

        space_ids = [t.id for t in table]
        # query for all photos that match a space_id
        photos_query = session.query(models.Photo).filter(
            models.Photo.space_id.in_(space_ids)
        )

        spaces = table
        photos = photos_query.all()

        data = {
            "spaces": [item.to_json() for item in spaces],
            "photos": [item.to_json() for item in photos],
        }
    return data


def check_user_admin():
    if "username" in sesh:
        user_id = sesh.get("username")
    else:
        return False

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
def get_reviews(space_id=None, puid=None):
    with sqlalchemy.orm.Session(engine) as session:
        if space_id:
            q = session.query(models.Review).filter(models.Review.space_id == space_id)
        elif puid:
            q = session.query(models.Review).filter(models.Review.user_id == puid)
            table = q.all()
            reviews = [review.to_json() for review in table]
            space_ids = [rev["spaceid"] for rev in reviews]
            spaces = (
                session.query(models.Space)
                .filter(models.Space.id.in_(space_ids))
                .with_entities(models.Space.id, models.Space.name)
                .all()
            )

            hash_map = dict(spaces)
            for review in reviews:
                review.update({"space_name": hash_map[review["spaceid"]]})
            
            return reviews
        else:
            q = session.query(models.Review)

        table = q.all()
        reviews = [review.to_json() for review in table]
    return reviews


# add a review consisting of rating and content
def add_review(
    space_id,
    puid,
    rating,
    content,
    noisiness,
    privacy,
    lighting,
    cleanliness,
    amenities_rating,
):
    review_id = None
    with sqlalchemy.orm.Session(engine) as session:
        new_review = models.Review(
            space_id=space_id,
            user_id=puid,
            rating=rating,
            content=content,
            noisiness=noisiness,
            privacy=privacy,
            lighting=lighting,
            cleanliness=cleanliness,
            amenities_rating=amenities_rating,
        )
        session.add(new_review)
        ret = f"created review for space {space_id} by user {puid} with "
        ret += f"rating {rating} and content: {content}"

        session.commit()
        print(ret)
        review_id = new_review.id

    return review_id


# update a review for space with space_id by user with id of user_id
def update_review(review_id, user_id, dict_of_changes):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Review).filter(models.Review.id == review_id)
        table = query.all()

        if not table:
            ret = f"no review with id {review_id} exists"
        elif table[0].user_id == user_id:  # permission handling
            query.update(dict_of_changes, synchronize_session=False)
            ret = f"review with id '{review_id}' updated"
        else:
            ret = f"{user_id} has insufficient permissions to udpate review with id {review_id}"
        session.commit()

    return ret


# delete a review for space with space_id created by user specified by user_id
def remove_review(review_id, user_id, admin):

    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Review).filter(models.Review.id == review_id)
        table = query.all()

        # add verification for permissions on delete.
        if not table:
            ret = f"review with id {review_id} does not exist"
        elif table[0].user_id == user_id or admin:
            update_space_from_review(
                table[0].space_id,
                table[0].rating,
                table[0].noisiness,
                table[0].privacy,
                table[0].lighting,
                table[0].cleanliness,
                table[0].amenities_rating,
                False,
            )
            query.delete(synchronize_session=False)
            ret = f"deleted review with id {review_id}"
        else:
            ret = f"{user_id} has insufficient permissions to delete review with id {review_id}"

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
        new_tag = models.Tag(space_id=space_id, review_id=review_id, tag=tag)
        session.add(new_tag)
        ret = f"added tag '{tag}'"

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
        if space_id:
            query = session.query(models.Amenity).filter(
                models.Amenity.space_id == space_id, models.Amenity.amenity == amenity
            )
            table = query.all()

            if table:
                return (
                    f"amenity '{amenity}' for space with id {space_id} already exists"
                )

        new_amenity = models.Amenity(
            space_id=space_id, review_id=review_id, amenity=amenity
        )
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
    cloudinary.config(
        cloud_name=os.getenv("CLOUD_NAME"),
        api_key=os.getenv("CLOUD_API_KEY"),
        api_secret=os.getenv("CLOUD_API_SECRET"),
    )
    upload_result = cloudinary.uploader.upload(
        src, resource_type="raw", folder="SpaceTiger/photos/"
    )
    return upload_result["url"]


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

if __name__ == "__main__":
    pass
