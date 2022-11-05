import os
import sys
import sqlalchemy
import sqlalchemy.orm

import models

# ----------------------------------------------------------------------

DATABASE_URL = os.getenv("TEST_DB_URL")

# ----------------------------------------------------------------------

def main():
    if len(sys.argv) != 1:
        print("Usage: python create.py", file=sys.stderr)
        sys.exit(1)

    try:
        engine = sqlalchemy.create_engine(DATABASE_URL)

        models.Base.metadata.drop_all(engine)
        models.Base.metadata.create_all(engine)

        with sqlalchemy.orm.Session(engine) as session:
            book = models.Book(
                isbn=123, title="The Practice of Programming", quantity=500
            )
            session.add(book)
            book = models.Book(
                isbn=234, title="The C Programming Language", quantity=800
            )
            session.add(book)
            book = models.Book(isbn=345, title="Algorithms in C", quantity=650)
            session.add(book)
            session.commit()

        engine.dispose()

    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)

# ----------------------------------------------------------------------

if __name__ == "__main__":
    main()
