import pandas as pd
from sqlalchemy.exc import IntegrityError

import database

# ----------------------------------------------------------------------

spaces = pd.read_csv("scraper/spaces.csv", index_col="id")
reviews = pd.read_csv("scraper/reviews.csv", index_col="id")
amenities = pd.read_csv("scraper/amenities.csv")
photos = pd.read_csv("scraper/photos_urls.csv")

# ----------------------------------------------------------------------

try:
    database.post_user("emssystem")

    print("Starting to add spaces")
    for _, space in spaces.iterrows():
        puid, name, _, capacity, _, _, location, bad_type = space
        type = bad_type.split(" - ")[0] # removes the hyphen
        database.add_space(puid=puid, name=name, capacity=capacity,
            location=location, type=type, approved=True)
    print("Finished adding spaces")

    print("Starting to add reviews")
    for _, review in reviews.iterrows():
        space_id, puid, rating, content = review
        database.add_review(space_id=space_id, puid=puid, rating=rating,
            content=content, noisiness=0, lighting=0, privacy=0,
            cleanliness=0, amenities_rating=0)
    print("Finished adding reviews")

    print("Starting to add amenities")
    for _, amenity in amenities.iterrows():
        space_id, amenity, _ = amenity
        if isinstance(amenity, str):
            try:
                print(database.add_amenity(space_id=space_id,
                    amenity=amenity))
            except IntegrityError: # need to be a bit more specific
                pass
    print("Finished adding amenities")

    print("Starting to add photos")
    for _, photo in photos.iterrows():
        space_id, _, _, url = photo
        if isinstance(url, str):
            database.add_photo(space_id=space_id, src=url)
    print("Finished adding photos")

except IntegrityError:
    print("Nothing to worry about if you know what you're doing.")

# NOTE: Cannot use these because the table's index doesn't update
# spaces.to_sql("spaces", engine, if_exists="append", index=False)
# reviews.to_sql("reviews", engine, if_exists="append", index=False)
# amenities.to_sql("amenities", engine, if_exists="append", index=False)
# photos.to_sql("photos", engine, if_exists="append", index=False)
