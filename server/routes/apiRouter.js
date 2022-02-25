const express = require('express');
const dbRouter = require('./api/dbRouter');
const userRouter = require('./api/userRouter');
const api = express.Router();

api.use('/db', dbRouter);

api.use('/user', userRouter);

module.exports = api;