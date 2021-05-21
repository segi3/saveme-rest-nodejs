const express = require('express');
const app = express();
const db = require('@root/db');

// config env
require('dotenv').config()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

const { admin } = require('@root/utils/firebase')

// old routes
const UserController = require('@root/user/UserController');
app.use('/users', UserController);
const AuthController = require('@root/auth/AuthController');
app.use('/api/auth/v1', AuthController);

// use routes
const testRoutes = require('@route/testRoute')
app.use('/test', testRoutes)

module.exports = app;