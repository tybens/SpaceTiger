import sys
import os

import psycopg2
import sqlalchemy
import sqlalchemy.orm

import database

url = "postgresql://qhjaoqcd:sL97vDNOcpSWbPYcy248g8m9n_fLJ1zA@peanut.db.elephantsql.com/qhjaoqcd"
engine = sqlalchemy.create_engine(url)



def get_space(query):

    with sqlalchemy.orm.Session(engine) as session:
        query = session.query(database.Book).filter(
            database.Book.isbn.ilike(isbn+'%'))
        table = query.all()
        

    return table

def _test():
    database.Book.query
    
if __name__ == '__main__':
    _test()
