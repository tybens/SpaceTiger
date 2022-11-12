import sqlalchemy.ext.declarative
import sqlalchemy

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

class Amenities (Base):
    __tablename__ = 'amenities'
    space_id = sqlalchemy.Column(sqlalchemy.Integer, primary_key = True)
    review_id = sqlalchemy.Column(sqlalchemy.Integer)
    amenity = sqlalchemy.Column(sqlalchemy.String)

class Photos (Base):
    __tablename__ = 'photos'
    space_id = sqlalchemy.Column(sqlalchemy.Integer, primary_key = True)
    review_id = sqlalchemy.Column(sqlalchemy.Integer)
    src = sqlalchemy.Column(sqlalchemy.String)

class Reviews (Base):
    __tablename__ = 'reviews'
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key = True)
    space_id = sqlalchemy.Column(sqlalchemy.Integer)
    user_id = sqlalchemy.Column(sqlalchemy.Integer)
    rating = sqlalchemy.Column(sqlalchemy.Integer)
    content = sqlalchemy.Column(sqlalchemy.String)