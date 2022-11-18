import os
import pandas as pd
import sqlalchemy

import database

# ----------------------------------------------------------------------

DATABASE_URL = os.getenv("TEST_DB_URL")

# ----------------------------------------------------------------------

spaces = pd.read_csv("scraper/spaces.csv", index_col="id")
amenities = pd.read_csv("scraper/amenities.csv")
reviews = pd.read_csv("scraper/reviews.csv", index_col="id")
photos = pd.read_csv("scraper/photos.csv")

# ----------------------------------------------------------------------

engine = sqlalchemy.create_engine(DATABASE_URL)

for index, space in spaces.iterrows():
    puid, name, _, capacity, _, _, location, type = space
    database.add_space(puid, name, capacity, location, type)

for index, review in reviews.iterrows():
    space_id, puid, rating, content = review
    database.post_review(space_id, puid, rating, content)

# NOTE: Cannot use these because the table's index doesn't update
# spaces.to_sql("spaces", engine, if_exists="append", index=False)
# reviews.to_sql("reviews", engine, if_exists="append", index=False)
# amenities.to_sql("amenities", engine, if_exists="append", index=False)
# photos.to_sql("photos", engine, if_exists="append", index=False)
