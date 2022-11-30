import os
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.exc import IntegrityError

import database

# ----------------------------------------------------------------------

DATABASE_URL = os.getenv("TEST_DB_URL")

# ----------------------------------------------------------------------

spaces = pd.read_csv("scraper/spaces.csv", index_col="id")
reviews = pd.read_csv("scraper/reviews.csv", index_col="id")
amenities = pd.read_csv("scraper/amenities.csv")
photos = pd.read_csv("scraper/photos_urls.csv")

# ----------------------------------------------------------------------

try:
    engine = create_engine(DATABASE_URL)

    database.post_user("emssystem")

    for _, space in spaces.iterrows():
        puid, name, _, capacity, _, _, location, bad_type = space
        type = bad_type.split(" - ")[0] # removes the hyphen
        database.add_space(puid, name, capacity, location, type, True)

    for _, review in reviews.iterrows():
        space_id, puid, rating, content = review
        database.add_review(space_id, puid, rating, content)

    for _, amenity in amenities.iterrows():
        space_id, amenity, _ = amenity
        if isinstance(amenity, str):
            database.add_amenity(space_id, amenity)

    for _, photo in photos.iterrows():
        space_id, _, _, url = photo
        if isinstance(url, str):
            print(database.add_photo(space_id, url))

except IntegrityError:
    print("Nothing to worry about if you know what you're doing.")

# NOTE: Cannot use these because the table's index doesn't update
# spaces.to_sql("spaces", engine, if_exists="append", index=False)
# reviews.to_sql("reviews", engine, if_exists="append", index=False)
# amenities.to_sql("amenities", engine, if_exists="append", index=False)
# photos.to_sql("photos", engine, if_exists="append", index=False)
