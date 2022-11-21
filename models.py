import sqlalchemy.ext.declarative
import sqlalchemy
import uuid
import os

from guid import GUID

# -----------------------------------------------------------------------

Base = sqlalchemy.ext.declarative.declarative_base()

class Space(Base):
    __tablename__ = "spaces"
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    user_id = sqlalchemy.Column(sqlalchemy.String)
    name = sqlalchemy.Column(sqlalchemy.String)
    type = sqlalchemy.Column(sqlalchemy.String)
    location = sqlalchemy.Column(sqlalchemy.String)
    capacity = sqlalchemy.Column(sqlalchemy.Integer)
    numreviews = sqlalchemy.Column(sqlalchemy.Integer)
    rating = sqlalchemy.Column(sqlalchemy.Integer)
    numvisits = sqlalchemy.Column(sqlalchemy.Integer)

    def __repr__(self):
        repr = f"Space(id={self.id!r}, name={self.name!r}, "
        repr += f"type={self.type!r}, location={self.location!r}, "
        repr += f"capacity={self.capacity!r})"
        return repr

    def to_json(self):
        return {
            "id": self.id,
            "userid": self.user_id,
            "name": self.name,
            "type": self.type,
            "location": self.location,
            "capacity": self.capacity,
            "numreviews": self.numreviews,
            "rating": self.rating,
            "numvisits": self.numvisits,
        }


class Tag(Base):
    __tablename__ = "tags"
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    space_id = sqlalchemy.Column(sqlalchemy.Integer)
    review_id = sqlalchemy.Column(sqlalchemy.Integer)
    tag = sqlalchemy.Column(sqlalchemy.String)

    def __repr__(self):
        repr = f"Tag(space_id={self.space_id!r}, "
        repr += f"review_id={self.review_id!r}, tag={self.tag!r})"
        return repr

    def to_json(self):
        return {
            "spaceid": self.space_id,
            "reviewid": self.review_id,
            "tag": self.tag,
        }


class Amenity(Base):
    __tablename__ = "amenities"
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    space_id = sqlalchemy.Column(sqlalchemy.Integer)
    review_id = sqlalchemy.Column(sqlalchemy.Integer)
    amenity = sqlalchemy.Column(sqlalchemy.String)

    def __repr__(self):
        repr = f"Amenity(space_id={self.space_id!r}, "
        repr += f"review_id={self.review_id!r}, amenity={self.amenity!r})"
        return repr

    def to_json(self):
        return {
            "spaceid": self.space_id,
            "reviewid": self.review_id,
            "amenity": self.amenity,
        }


class Photo(Base):
    __tablename__ = "photos"
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    space_id = sqlalchemy.Column(sqlalchemy.Integer)
    review_id = sqlalchemy.Column(sqlalchemy.Integer)
    src = sqlalchemy.Column(sqlalchemy.String)

    def __repr__(self):
        repr = f"Photo(space_id={self.space_id!r}, "
        # only show the first 240 characters of the src url
        repr += f"review_id={self.review_id!r}, src={self.src[:240]!r})"
        return repr

    def to_json(self):
        return {"spaceid": self.space_id, "reviewid": self.review_id, "src": self.src}


class Review(Base):
    __tablename__ = "reviews"
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    space_id = sqlalchemy.Column(sqlalchemy.Integer)
    user_id = sqlalchemy.Column(sqlalchemy.String)
    rating = sqlalchemy.Column(sqlalchemy.Integer)
    content = sqlalchemy.Column(sqlalchemy.String)

    def __repr__(self):
        repr = f"Review(space_id={self.space_id!r}, user_id={self.user_id!r}, "
        repr += f"rating={self.rating!r}, content={self.content!r})"
        return repr

    def to_json(self):
        return {
            "id": self.id,
            "spaceid": self.space_id,
            "userid": self.user_id,
            "rating": self.rating,
            "content": self.content,
        }


class User(Base):
    __tablename__ = "users"
    puid = sqlalchemy.Column(sqlalchemy.String, primary_key=True)

    def __repr__(self):
        return f"User(puid={self.puid!r})"

    def to_json(self):
        return {
            "puid": self.puid,
        }


class Favorite(Base):
    __tablename__ = "favorites"
    id = sqlalchemy.Column(GUID, primary_key=True, default=uuid.uuid4)
    user_id = sqlalchemy.Column(sqlalchemy.String)
    space_id = sqlalchemy.Column(sqlalchemy.Integer)

    def __repr__(self):
        return f"Favorite(id={self.id!r}, user_id={self.user_id!r}, space_id={self.space_id!r})"

    def to_json(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "space_id": self.space_id,
        }

# -----------------------------------------------------------------------

if __name__ == "__main__":
    e = sqlalchemy.create_engine(os.getenv("TEST_DB_URL"))
    Base.metadata.create_all(e) # runs CREATE TABLE for all models here
