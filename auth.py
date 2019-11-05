from flask import Flask, Blueprint, request, session, redirect, url_for, jsonify
from . import mongo, bcrypt
from flask_pymongo import PyMongo
from flask_jwt_extended import (create_access_token)

from datetime import datetime
import logging

auth = Blueprint('auth', __name__)


@auth.route('/', methods=['POST'])
def index():
    if 'username' in session:
        return 'Logged in as' + session['username']


@auth.route('/login', methods=['GET', 'POST'])
def login():
    users = mongo.db.user
    username = request.get_json()['username']
    password = request.get_json()['password']

    login_user = users.find_one({'username': username})
    result = ''

    if login_user:
        if bcrypt.check_password_hash(login_user['password'], password):
            access_token = create_access_token(identity={
                'username': login_user['username'],
                'email': login_user['email']
            })
            result = jsonify({'token': access_token})
        else:
            result = jsonify({'result': 'Invalid username or password'})
    else:
        result = jsonify({'result': 'No user found'})

    return result


@auth.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        users = mongo.db.user
        username = request.get_json()['username']
        email = request.get_json()['email']
        existing_user = users.find_one({'username': username})
        created = datetime.utcnow()
        password = bcrypt.generate_password_hash(
            request.get_json()['password']).decode('utf-8')
        result = ''

        if existing_user is None:
            users.insert(
                {'username': username, 'email': email, 'password': password})
            session['username'] = username
            return jsonify({'result':  'User successfully registered'})

        return jsonify({'result': 'User already exists'})

    return jsonify({'result': 'Welcome'})


@auth.route('/logout', methods=['GET', 'POST'])
def logout():
    return 'Logout'
