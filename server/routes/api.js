const express = require('express');
const db = require('./db');
const userRouter = require('./user');
const api = express.Router();


api.use('/db', db);

api.use('/user', userRouter);


module.exports = api;