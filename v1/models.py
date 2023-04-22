from pydantic import BaseSettings
from pydantic.networks import IPvAnyAddress
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import create_engine

from sqlalchemy import Table, Boolean, Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship, backref, Mapped


class PGSettings(BaseSettings):
    host: IPvAnyAddress
    port: int = 5432
    user: str = 'postgres'
    password: str
    dbname: str = 'prober'

    class Config:
        env_prefix = 'pg_'


pg = PGSettings()
SQLALCHEMY_DATABASE_URL = f"postgresql://{pg.user}:{pg.password}@{pg.host}/{pg.dbname}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    # echo=True,
    # connect_args={"check_same_thread": False}
)
Session = sessionmaker(bind=engine,
                       autocommit=False,
                       autoflush=False,
                       )

Base = declarative_base()


def get_session():
    db = Session()
    try:
        yield db
    finally:
        db.close()



class Teams(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    team_id = Column(Integer)

    def __repr__(self):
        return f'{self.__class__.__name__} (id={self.id}, name={self.name})'

class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    team_id = Column(Integer)

    def __repr__(self):
        return f'{self.__class__.__name__} (id={self.id}, name={self.name})'
