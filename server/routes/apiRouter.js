const express = require('express');
const dbRouter = require('./api/dbRouter');
const userRouter = require('./api/userRouter');
const queryRouter = require('./api/queryRouter');
const api = express.Router();

api.use('/db', dbRouter);

api.use('/user', userRouter);

api.use('/query', queryRouter);

api.get('/test', (req, res) => {
  res.status(200).send('Success!');
});

module.exports = api;