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

    def to_json(self):
        return {
            'id': self.id,
            'user id': self.user_id,
            'name': self.name,
            'type': self.type,
            'location': self.location,
            'capacity': self.capacity,
            'number of reviews': self.numreviews,
            'rating': self.rating,
            'number of visits': self.numvisits
        }

class Amenities (Base):
    __tablename__ = 'amenities'
    space_id = sqlalchemy.Column(sqlalchemy.Integer, primary_key = True)
    review_id = sqlalchemy.Column(sqlalchemy.Integer)
    amenity = sqlalchemy.Column(sqlalchemy.String)

    def to_json(self):
        return {
            'space id': self.space_id,
            'review id': self.review_id,
            'amenity': self.amenity
        }

class Photos (Base):
    __tablename__ = 'photos'
    space_id = sqlalchemy.Column(sqlalchemy.Integer, primary_key = True)
    review_id = sqlalchemy.Column(sqlalchemy.Integer)
    src = sqlalchemy.Column(sqlalchemy.String)

    def to_json(self):
        return {
            'space id': self.space_id,
            'review id': self.review_id,
            'src': self.src
        }

class Reviews (Base):
    __tablename__ = 'reviews'
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key = True)
    space_id = sqlalchemy.Column(sqlalchemy.Integer)
    user_id = sqlalchemy.Column(sqlalchemy.Integer)
    rating = sqlalchemy.Column(sqlalchemy.Integer)
    content = sqlalchemy.Column(sqlalchemy.String)

    def to_json(self):
        return {
            'id': self.id,
            'space id': self.space_id,
            'user id': self.user_id,
            'rating': self.rating,
            'content': self.content
        }