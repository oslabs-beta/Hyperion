const express = require('express');
const dbRouter = require('./api/dbRouter');
const userRouter = require('./api/userRouter');
const queryRouter = require('./api/queryRouter');
const api = express.Router();

api.use('/db', dbRouter);

api.use('/user', userRouter);

api.use('/query', queryRouter)

module.exports = api;