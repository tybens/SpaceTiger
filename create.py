#-----------------------------------------------------------------------
# database.py
# Author: SpaceTiger
#-----------------------------------------------------------------------
import sys
import os

import sqlite3
from sqlalchemy
import sqlalchemy.orm

import database

#-----------------------------------------------------------------------
#setx DATABASE_URL "...our SpaceTiger url..."
url = os.getenv("DATABASE_URL")
def main():

    if len(sys.argv) != 1:
        print('Usage: python create.py', file=sys.stderr)
        sys.exit(1)

    try:
        engine = sqlalchemy.create_engine('sqlite://',
            creator=lambda: sqlite3.connect(url, uri=True))

        database.Base.metadata.drop_all(engine)
        database.Base.metadata.create_all(engine)

        with sqlalchemy.orm.Session(engine) as session:

            #-----------------------------------------------------------

            book = database.Book(isbn=123,
                title='The Practice of Programming', quantity=500)
            session.add(book)
            book = database.Book(isbn=234,
                title='The C Programming Language', quantity=800)
            session.add(book)
            book = database.Book(isbn=345,
                title='Algorithms in C', quantity=650)
            session.add(book)
            session.commit()
        engine.dispose()

    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

#-----------------------------------------------------------------------

if __name__ == '__main__':
    main()