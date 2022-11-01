# -----------------------------------------------------------------------
# database.py
# Author: SpaceTiger
# -----------------------------------------------------------------------
import sys
import os

import psycopg2
import sqlalchemy
import sqlalchemy.orm

import database

# -----------------------------------------------------------------------
# setx DATABASE_URL "...our SpaceTiger url..."
url = "postgresql://qhjaoqcd:sL97vDNOcpSWbPYcy248g8m9n_fLJ1zA@peanut.db.elephantsql.com/qhjaoqcd"


def main():

    if len(sys.argv) != 1:
        print("Usage: python create.py", file=sys.stderr)
        sys.exit(1)

    try:
        engine = sqlalchemy.create_engine(url)

        database.Base.metadata.drop_all(engine)
        database.Base.metadata.create_all(engine)

        with sqlalchemy.orm.Session(engine) as session:

            # -----------------------------------------------------------

            book = database.Book(
                isbn=123, title="The Practice of Programming", quantity=500
            )
            session.add(book)
            book = database.Book(
                isbn=234, title="The C Programming Language", quantity=800
            )
            session.add(book)
            book = database.Book(isbn=345, title="Algorithms in C", quantity=650)
            session.add(book)
            session.commit()
        engine.dispose()

    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)


# -----------------------------------------------------------------------

if __name__ == "__main__":
    main()
