from fastapi import Depends, APIRouter

from .schemas import User, UserCreate, UserUpdate
from .services import user_service
from models import Session, get_session

router = APIRouter(
    prefix="/user",
    tags=["Users"],
    # dependencies=[Depends(get_db)],
    # responses={404: {"description": "Страница не найдена"}},
)


@router.get("/", response_model=list[User])
def get_list_users(db: Session = Depends(get_session)):
    """Показывает список Пользователей"""

    return user_service.get_many(db)


@router.get("/{user_id}", response_model=User)
def get_user(user_id: int,
             db: Session = Depends(get_session)):
    """Показывает Пользователя"""

    return user_service.get(db, user_id)


@router.post("/", status_code=201, response_model=User)
def add_users_to_customer(obj_user: UserCreate,
                          db: Session = Depends(get_session),
                          ):
    """Создание пользователя"""

    return user_service.create(db, obj_user)


@router.put("/{user_id}", response_model=User)
def update_user(user_id: int,
                obj_update: UserUpdate,
                db: Session = Depends(get_session),
                ):
    """Редактирование пользователя"""

    return user_service.update(db, user_id, obj_update)


@router.delete("/{user_id}", response_model=User)
def delete_user(user_id: int,
                db: Session = Depends(get_session),
                ):
    """Удаляет пользователя"""

    return user_service.delete(db, user_id)
