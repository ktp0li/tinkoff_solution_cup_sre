from pydantic import BaseModel


class BaseUser(BaseModel):
    name: str
    team_id: int | None


class UserCreate(BaseUser):
    pass


class UserUpdate(BaseUser):
    pass


class User(BaseUser):
    id: int

    class Config:
        orm_mode = True
