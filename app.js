const express = require('express');
const app = express();
// const db = require('@root/db');

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

//* use routes

// testing routes
const testRoutes = require('@route/testRoute')
app.use('/test', testRoutes)

// acount routes
const accountRoutes = require('@route/accountRoutes')
app.use('/api/account/v1', accountRoutes)

// ping routes
const pingRoutes = require('@route/pingRoutes')
app.use('/api/ping/v1', pingRoutes)

module.exports = app;