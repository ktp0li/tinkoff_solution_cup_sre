import enum

from flask import Flask
from flask_sqlalchemy import SQLAlchemy, Enum


app = Flask('jojoj')
db = SQLAlchemy(app)


class Recurrence(db.Model):
    __tablename__ = 'recurrence'
    id = db.Column(db.Integer, primary_key=True)
    minute = db.Column(db.SmallInteger, index=True, nullable=True)
    hour = db.Column(db.SmallInteger, index=True, nullable=True)
    month_day = db.Column(db.SmallInteger, index=True, nullable=True)
    year_day = db.Column(db.SmallInteger, index=True, nullable=True)
    week_day = db.Column(db.SmallInteger, index=True, nullable=True)
    year = db.Column(db.SmallInteger, index=True, nullable=True)


class DataCenter(db.Model):
    __tablename__ = 'data_center'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)
    location = db.Column(db.String(64), index=True)


class Service(db.Model):
    __tablename__ = 'service'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)


class AvailabilityZone(db.Model):
    __tablename__ = 'availability_zone'
    id = db.Column(db.Integer, primary_key=True)
    data_center_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'))
    blacklisted = db.Column(db.Boolean, index=True, default=False)


class AvailabilityZoneWhiteWindow(db.Model):
    __tablename__ = 'availability_zone_white_window'
    id = db.Column(db.Integer, primary_key=True)
    availability_zone_id = db.Column(db.Integer, db.ForeignKey('availability.id'))
    recurrence_id = db.Column(db.Integer, db.ForeignKey('recurrence.id'))


class WorkerType(enum.Enum):
    person = 1
    bot = 2


class Worker(db.Model):
    __tablename__ = 'worker'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(Enum(WorkerType))


class Person(db.Model):
    __tablename__ = 'person'
    id = db.Column(db.Integer, primary_key=True)
    worker_id = db.Column(db.Integer, db.ForeignKey('worker.id'), unique=True)


class Bot(db.Model):
    __tablename__ = 'bot'
    id = db.Column(db.Integer, primary_key=True)
    worker_id = db.Column(db.Integer, db.ForeignKey('worker.id'), unique=True)


class Priority(enum.Enum):
    regular = 1
    critical = 2


class TaskStatus(enum.Enum):
    pending = 1
    resolved = 2
    rejected = 3
    rescheduled = 4
    extended = 5


class Task(db.Model):
    __tablename__ = 'task'
    id = db.Column(db.Integer, primary_key=True)
    worker_id = db.Column(db.Integer, db.ForeignKey('worker.id'))
    start_time = db.Column(db.DateTime, index=True)
    duration = db.Column(db.Interval, index=True)
    hard_end_time = db.Column(db.DateTime, index=True)
    priority: db.Column(Enum(Priority))
    status: db.Column(Enum(TaskStatus))
    task_id: db.Column(db.Integer, db.ForeignKey('task.id'), unique=True, nullable=True)


class RepetitiveTask(db.Model):
    __tablename__ = 'repetitive_task'
    id = db.Column(db.Integer, primary_key=True)
    worker_id = db.Column(db.Integer, db.ForeignKey('worker.id'))
    repetitive_id = db.Column(db.Integer, db.ForeignKey('repetitive.id'))
    min_duration = db.Column(db.Interval, index=True)
    max_duration = db.Column(db.Interval, index=True)
    priority: db.Column(Enum(Priority))
