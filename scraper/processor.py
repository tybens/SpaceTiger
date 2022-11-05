import os
import pandas as pd
import sqlalchemy

# ----------------------------------------------------------------------

DATABASE_URL = os.getenv("TEST_DB_URL")

# ----------------------------------------------------------------------

room_details = pd.read_csv("ems_rooms.csv")
room_features = pd.read_csv("ems_rooms_features.csv")
rooms = pd.merge(room_details, room_features, on="LocationLink")
rooms = rooms.drop(columns=["LocationLink", "RecordType", "MinCapacity",
    "PromptForBillingReference", "AddRoomToCartText", "SetupHours",
    "TeardownHours", "BuildingID",  "SeqNo", "Code", "Description_x",
    "Room Code", "Description_y", "Phone", "URL", "Floor", "Size", "Id"])
rooms = rooms.rename(columns={"DisplayText": "name", "Building": "location",
    "Room Type": "type", "Features": "amenities", "Images": "photos",
    "Capacity": "capacity", "Notes": "content"})
rooms.insert(0, "id", range(0, len(rooms)))
rooms.insert(1, "user_id", [0] * len(rooms)) # associate user_id 0 with ems data
rooms.insert(3, "numreviews", [0] * len(rooms))
rooms.insert(5, "rating", [0] * len(rooms))
rooms.insert(6, "numvisits", [0] * len(rooms))

amenities = rooms[["id", "amenities"]] # for amenities table
amenities["amenities"] = amenities["amenities"].apply(lambda x: x.strip('][').split(', '))
amenities = amenities.explode("amenities", ignore_index=True)
amenities["amenities"] = amenities["amenities"].apply(lambda x: x[1:-1])
amenities = amenities.rename(columns={"id": "space_id", "amenities": "amenity"})
amenities.loc[:, "review_id"] = None

reviews = rooms[["id", "user_id", "rating", "content"]] # for reviews table
reviews = reviews.rename(columns={"id": "space_id"})
reviews = reviews[reviews["content"] != "(none)"].dropna()
reviews.insert(0, "id", range(0, len(reviews)))
reviews = reviews.reset_index(drop=True)

photos = rooms[["id", "photos"]] # for photos table
photos["photos"] = photos["photos"].apply(lambda x: x.strip('][').split(', '))
photos = photos.explode("photos", ignore_index=True)
photos["photos"] = photos["photos"].apply(lambda x: x[1:-1])
photos = photos.rename(columns={"id": "space_id", "photos": "src"})
photos.loc[:, "review_id"] = None
photos = photos.reset_index(drop=True)

spaces = rooms.drop(columns=["amenities", "content", "photos"])
for index, row in spaces.iterrows():
    # append building to names containing only room numbers for clarity
    name = row["name"]
    if len(name.split()) == 1: # will be a single word
        location = row["location"]
        if location == "Nassau Street, 185":
            location = "185 Nassau Street"
        spaces.at[index, "name"] = f"{location} {name}"

# spaces.to_csv("spaces.csv", index=False)
# amenities.to_csv("amenities.csv", index=False)
# reviews.to_csv("reviews.csv", index=False)
# photos.to_csv("photos.csv", index=False)

# ----------------------------------------------------------------------

engine = sqlalchemy.create_engine(DATABASE_URL)
spaces.to_sql("spaces", engine, if_exists="replace", index=False)
amenities.to_sql("amenities", engine, if_exists="replace", index=False)
reviews.to_sql("reviews", engine, if_exists="replace", index=False)
photos.to_sql("photos", engine, if_exists="replace", index=False)
