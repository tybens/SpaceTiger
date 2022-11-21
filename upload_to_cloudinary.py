import os
import pandas as pd
from sqlalchemy import create_engine
import cloudinary 

# ----------------------------------------------------------------------

DATABASE_URL = os.getenv("TEST_DB_URL")

# ----------------------------------------------------------------------

photos = pd.read_csv("scraper/photos.csv")

# ----------------------------------------------------------------------

try:
    engine = create_engine(DATABASE_URL)
    
    space_id, src, _ = photos.iloc[0].values
    
    print(space_id)
    for _, photo in photos.iterrows():
        space_id, src, _ = photo
        if isinstance(src, str):
            cloudinary.uploader.upload(src) 
    

except:
    pass     
