import sqlalchemy.ext.declarative
import sqlalchemy
import uuid
import os

from guid import GUID

Base = sqlalchemy.ext.declarative.declarative_base()


class Book(Base):
    __tablename__ = "books"
    isbn = sqlalchemy.Column(sqlalchemy.String, primary_key=True)
    title = sqlalchemy.Column(sqlalchemy.String)
    quantity = sqlalchemy.Column(sqlalchemy.Integer)


class Space(Base):
    __tablename__ = "spaces"
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    user_id = sqlalchemy.Column(sqlalchemy.Integer)
    name = sqlalchemy.Column(sqlalchemy.String)
    type = sqlalchemy.Column(sqlalchemy.String)
    location = sqlalchemy.Column(sqlalchemy.String)
    capacity = sqlalchemy.Column(sqlalchemy.Integer)
    numreviews = sqlalchemy.Column(sqlalchemy.Integer)
    rating = sqlalchemy.Column(sqlalchemy.Integer)
    numvisits = sqlalchemy.Column(sqlalchemy.Integer)

    def __repr__(self):
        return f"Space(id={self.id!r}, name={self.name!r})"

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


class Amenities(Base):
    __tablename__ = "amenities"
    space_id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    review_id = sqlalchemy.Column(sqlalchemy.Integer)
    amenity = sqlalchemy.Column(sqlalchemy.String)

    def to_json(self):
        return {
            "spaceid": self.space_id,
            "reviewid": self.review_id,
            "amenity": self.amenity,
        }


class Photos(Base):
    __tablename__ = "photos"
    space_id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    review_id = sqlalchemy.Column(sqlalchemy.Integer)
    src = sqlalchemy.Column(sqlalchemy.String)

    def to_json(self):
        return {"spaceid": self.space_id, "reviewid": self.review_id, "src": self.src}


class Reviews(Base):
    __tablename__ = "reviews"
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    space_id = sqlalchemy.Column(sqlalchemy.Integer)
    user_id = sqlalchemy.Column(sqlalchemy.Integer)
    rating = sqlalchemy.Column(sqlalchemy.Integer)
    content = sqlalchemy.Column(sqlalchemy.String)

    def to_json(self):
        return {
            "id": self.id,
            "spaceid": self.space_id,
            "userid": self.user_id,
            "rating": self.rating,
            "content": self.content,
        }


class Users(Base):
    __tablename__ = "users"
    puid = sqlalchemy.Column(sqlalchemy.String, primary_key=True)

    def __repr__(self):
        return f"User(puid={self.puid!r})"

    def to_json(self):
        return {
            "puid": self.puid,
        }


class Favorites(Base):
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


if __name__ == "__main__":
    e = sqlalchemy.create_engine(os.getenv("TEST_DB_URL"))
    # this runs the create table for all models here
    Base.metadata.create_all(e)
