import os
import sqlalchemy.ext.declarative
import sqlalchemy

import models

#-----------------------------------------------------------------------

DATABASE_URL = os.getenv("TEST_DB_URL")
engine = sqlalchemy.create_engine(DATABASE_URL)

#-----------------------------------------------------------------------

def get_spaces():
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Space)
        print(query)
        table = query.all()

    return table

def get_space(name):
    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(models.Space).filter(
            models.Space.name.ilike(f"%{name}%")
        )
        table = query.all()

    return table

#-----------------------------------------------------------------------

def _test():
    spaces = get_space("Frist N")
    for space in spaces:
        print(space)

#-----------------------------------------------------------------------

if __name__ == '__main__':
    _test()
