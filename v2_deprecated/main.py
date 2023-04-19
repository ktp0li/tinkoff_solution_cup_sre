from flask import Flask, request
from flask.views import MethodView
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:qwertyui@51.81.26.19/postgres"
db = SQLAlchemy(app)
