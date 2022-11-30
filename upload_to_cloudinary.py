import os
import pandas as pd
from sqlalchemy import create_engine
import cloudinary 
import cloudinary.uploader
# ----------------------------------------------------------------------

DATABASE_URL = os.getenv("TEST_DB_URL")

# ----------------------------------------------------------------------

photos = pd.read_csv("scraper/photos.csv")

# ----------------------------------------------------------------------

engine = create_engine(DATABASE_URL)
cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'), 
    api_secret=os.getenv('API_SECRET'))

urls = []
for _, photo in photos.iterrows():
    index, space_id, review_id, src = photo.values
    upload_result = cloudinary.uploader.upload(src, resource_type="raw", folder="SpaceTiger/photos/")
    urls.append(upload_result['url'])
    print(f"{index},{space_id},{upload_result['url']}")

df = pd.concat([photos, pd.DataFrame(urls)], axis=1)
df.to_csv("scraper/photos_urls.csv", index=False)
engine.dispose()
