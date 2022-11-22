import os
from sqlalchemy import create_engine, Column, Boolean

def add_column(engine, table_name, column):
    column_name = column.compile(dialect=engine.dialect)
    column_type = column.type.compile(engine.dialect)
    engine.execute('ALTER TABLE %s ADD COLUMN %s %s' % (table_name, column_name, column_type))


e = create_engine(os.getenv("TEST_DB_URL"))

col = Column('approved', Boolean, default=False)
add_column(e, "spaces", col)