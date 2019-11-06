from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

mongo = PyMongo()
bcrypt = Bcrypt()
jwt = JWTManager()


def create_app():
    app = Flask(__name__)

    app.config['MONGO_DBNAME'] = 'users'
    app.config['SECRET_KEY'] = 'thisisthesecretkey'
    app.config['MONGO_URI'] = 'mongodb+srv://userdb:MIloq3nVjjwYEiVM@cluster0-wogsk.mongodb.net/users?retryWrites=true&w=majority'

    mongo.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)

    CORS(app)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    return app
