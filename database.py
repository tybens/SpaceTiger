#-----------------------------------------------------------------------
# database.py
# Author: SpaceTiger
#-----------------------------------------------------------------------

import os
import psycopg2
#import sqlalchemy.ext.declarative
#import sqlalchemy
import urllib.parse as up
#type in terminal: 
#setx DATABASE_URL "...our SpaceTiger url..."

up.uses_netloc.append("postgres")
url = up.urlparse(os.getenv("DATABASE_URL"))
conn = psycopg2.connect(database=url.path[1:],
user=url.username,
password=url.password,
host=url.hostname,
port=url.port
)