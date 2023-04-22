from fastapi import HTTPException
from models import Users
from sqlalchemy.orm import Session

from .schemas import UserCreate, UserUpdate


class UserService():
    def __init__(self, model: Users):
        self.model = model

    def _commit(self, db: Session):
        try:
            db.commit()

        except Exception as err:
            print(str(err))
            raise HTTPException(status_code=400, detail=str(err))

    def get_many(self, db: Session):
        db_objs = (
            db.query(self.model)
            .all()
        )
        return db_objs

    def get(self, db: Session, _id: int):
        db_obj = (
            db.query(self.model)
            .filter(self.model.id == _id)
            .first()
        )
        return db_obj

    def create(self, db: Session, obj_in: UserCreate):
        db_obj = self.model(**obj_in.dict())

        db.add(db_obj)

        self._commit(db)
        print(f"создан {db_obj} c параметрами {obj_in.dict()}")

        return db_obj

    def update(self, db: Session, _id: int, obj_update: UserUpdate):
        db_obj = self.get(db, _id)

        for field, value in obj_update.dict(exclude_unset=True).items():  # skip_defaults
            if getattr(db_obj, field) != value:
                setattr(db_obj, field, value)

        self._commit(db)
        return db_obj

    def delete(self,  db: Session, _id: int):
        db_obj = self.get(db, _id)
        db.delete(db_obj)

        self._commit(db)
        return db_obj


user_service = UserService(Users)
