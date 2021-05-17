const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

const { admin } = require('./utils/firebase')

const UserController = require('./user/UserController');
app.use('/users', UserController);

const AuthController = require('./auth/AuthController');
app.use('/api/auth/v1', AuthController);

// use routes
const testRoutes = require('./routes/testRoute')
app.use('/test', testRoutes)

module.exports = app;