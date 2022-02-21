const express = require('express');
const db = require('./api/dbRouter');
const userRouter = require('./userRouter');
const api = express.Router();


api.use('/db', db);

api.use('/user', userRouter);


module.exports = api;