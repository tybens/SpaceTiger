from sqlalchemy import Column, ForeignKey, String, Integer, Boolean, Float, DateTime, create_engine
from sqlalchemy.orm import declarative_base, relationship
import uuid
import os
from sqlalchemy import Column, ForeignKey, String, Integer, Float, Boolean, create_engine
from sqlalchemy.orm import declarative_base, relationship

from guid import GUID

# -----------------------------------------------------------------------

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    puid = Column(String, primary_key=True)
    spaces = relationship("Space", back_populates="user")
    reviews = relationship("Review", back_populates="user")
    favorites = relationship("Favorite", cascade="all,delete", back_populates="user")
    reports = relationship("Report", cascade="all, delete", back_populates="user")
    admin = Column(Boolean, default=False)

    def __repr__(self):
        return f"User(puid={self.puid!r})"

    def to_json(self):
        return {
            "puid": self.puid,
        }


class Space(Base):
    __tablename__ = "spaces"
    id = Column(Integer, primary_key=True)
    user_id = Column(String, ForeignKey("users.puid"))
    name = Column(String)
    type = Column(String)
    location = Column(String)   
    capacity = Column(Integer)
    numreviews = Column(Integer)
    rating = Column(Float, nullable=True)
    numvisits = Column(Integer)
    approved = Column(Boolean, default=False)
    avgcleanliness = Column(Float, nullable=True)
    avgnoise = Column(Float, nullable=True)
    avgprivacy = Column(Float, nullable=True)
    avglighting = Column(Float, nullable=True)
    avgamenities = Column(Float, nullable=True)

    

    user = relationship("User", back_populates="spaces")
    reviews = relationship("Review", cascade="all,delete", back_populates="space")
    favorites = relationship("Favorite", cascade="all,delete", back_populates="space")
    tags = relationship("Tag", cascade="all,delete", back_populates="space")
    amenities = relationship("Amenity", cascade="all,delete", back_populates="space")
    photos = relationship("Photo", cascade="all,delete", back_populates="space")

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
            "approved": self.approved,
            "cleanliness": self.avgcleanliness,
            "noisiness": self.avgnoise,
            "privacy": self.avgprivacy,
            "lighting": self.avglighting,
            "amenities_rating": self.avgamenities,
        }


class Review(Base):
    __tablename__ = "reviews"
    id = Column(Integer, primary_key=True)
    space_id = Column(Integer, ForeignKey("spaces.id", ondelete="CASCADE"))
    user_id = Column(String, ForeignKey("users.puid", ondelete="CASCADE"))
    rating = Column(Integer)
    content = Column(String)
    cleanliness = Column(Integer)
    noisiness = Column(Integer)
    privacy = Column(Integer)
    lighting = Column(Integer)
    amenities_rating = Column(Integer)

    user = relationship("User", back_populates="reviews")
    space = relationship("Space", back_populates="reviews")
    reports = relationship("Report", cascade="all, delete", back_populates="review")
    tags = relationship("Tag", cascade="all,delete", back_populates="review")
    amenities = relationship("Amenity", cascade="all,delete", back_populates="review")
    photos = relationship("Photo", cascade="all,delete", back_populates="review")

    def __repr__(self):
        repr = f"Review(space_id={self.space_id!r}, user_id={self.user_id!r}, "
        repr += f"rating={self.rating!r}, content={self.content!r},"
        repr += f"cleanliness={self.cleanliness!r}, noisiness={self.noisiness!r},"
        repr += f"privacy={self.privacy!r}, lighting={self.lighting!r})"
        return repr

    def to_json(self):
        return {
            "id": self.id,
            "spaceid": self.space_id,
            "userid": self.user_id,
            "rating": self.rating,
            "content": self.content,
            "cleanliness": self.cleanliness,
            "noisiness": self.noisiness,
            "privacy": self.privacy,
            "lighting": self.lighting,
            "amenities_rating": self.amenities_rating,
            "tags": [tag.to_json() for tag in self.tags],
            "amenities": [amenity.to_json() for amenity in self.amenities],
            "photos": [photo.to_json() for photo in self.photos]
        }


class Favorite(Base):
    __tablename__ = "favorites"
    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    user_id = Column(String, ForeignKey("users.puid", ondelete="CASCADE"))
    space_id = Column(Integer, ForeignKey("spaces.id", ondelete="CASCADE"))

    user = relationship("User", back_populates="favorites")
    space = relationship("Space", back_populates="favorites")

    def __repr__(self):
        return f"Favorite(id={self.id!r}, user_id={self.user_id!r}, space_id={self.space_id!r})"

    def to_json(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "space_id": self.space_id,
        }

class Report(Base):
    __tablename__ = "reports"
    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    user_id = Column(String, ForeignKey("users.puid", ondelete="CASCADE"))
    review_id = Column(Integer, ForeignKey("reviews.id", ondelete="CASCADE"))
    content = Column(String)
    date = Column(DateTime)

    user = relationship("User", back_populates="reports")
    review = relationship("Review", back_populates="reports")

    def __repr__(self):
        repr = f"Report(id={self.id!r}, user_id={self.user_id!r}, "
        repr += f"review_id={self.review_id!r}, content={self.content!r}, "
        repr += f"date={self.date!r})"
        return repr

    def to_json(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "review_id": self.review_id,
            "content": self.content,
            "date": self.date,
            "review": self.review.to_json()
        }


class Tag(Base):
    __tablename__ = "tags"
    id = Column(Integer, primary_key=True)
    space_id = Column(Integer, ForeignKey("spaces.id", ondelete="CASCADE"))
    review_id = Column(Integer, ForeignKey("reviews.id", ondelete="CASCADE"))
    tag = Column(String)

    space = relationship("Space", back_populates="tags")
    review = relationship("Review", back_populates="tags")

    def __repr__(self):
        repr = f"Tag(space_id={self.space_id!r}, "
        repr += f"review_id={self.review_id!r}, tag={self.tag!r})"
        return repr

    def to_json(self):
        return {
            "id": self.id,
            "spaceid": self.space_id,
            "reviewid": self.review_id,
            "tag": self.tag,
        }


class Amenity(Base):
    __tablename__ = "amenities"
    id = Column(Integer, primary_key=True)
    space_id = Column(Integer, ForeignKey("spaces.id", ondelete="CASCADE"))
    review_id = Column(Integer, ForeignKey("reviews.id", ondelete="CASCADE"))
    amenity = Column(String)

    space = relationship("Space", back_populates="amenities")
    review = relationship("Review", back_populates="amenities")

    def __repr__(self):
        repr = f"Amenity(space_id={self.space_id!r}, "
        repr += f"review_id={self.review_id!r}, amenity={self.amenity!r})"
        return repr

    def to_json(self):
        return {
            "id": self.id,
            "spaceid": self.space_id,
            "reviewid": self.review_id,
            "amenity": self.amenity,
        }

class Photo(Base):
    __tablename__ = "photos"
    id = Column(Integer, primary_key=True)
    space_id = Column(Integer, ForeignKey("spaces.id", ondelete="CASCADE"))
    review_id = Column(Integer, ForeignKey("reviews.id", ondelete="CASCADE"))
    src = Column(String)

    space = relationship("Space", back_populates="photos")
    review = relationship("Review", back_populates="photos")

    def __repr__(self):
        repr = f"Photo(space_id={self.space_id!r}, "
        repr += f"review_id={self.review_id!r}, src={self.src!r})"
        return repr

    def to_json(self):
        return {
            "id": self.id,
            "spaceid": self.space_id,
            "reviewid": self.review_id,
            "src": self.src
        }

# -----------------------------------------------------------------------

if __name__ == "__main__":
    e = create_engine(os.getenv("TEST_DB_URL"))
    # Base.metadata.drop_all(e) # drops all the tables
    Base.metadata.create_all(e) # runs CREATE TABLE for all models here
    e.dispose()
