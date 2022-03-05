const express = require('express');
const dbController = require('../../controllers/dbController');
const userController = require('../../controllers/userController');

const queryRouter = express.Router();

queryRouter.post('/new', (req, res) => {
  res.status(200).json(res.locals.queryInfo);
});

queryRouter.delete('/delete', (req, res) => {
  res.status(200).json(res.locals.queryInfo);
});

module.exports = queryRouter;
