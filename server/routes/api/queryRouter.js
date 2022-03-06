const express = require('express');
const queryController = require('../../controllers/queryController');
const userController = require('../../controllers/userController');

const queryRouter = express.Router();

queryRouter.post('/new', userController.authorize, queryController.addNewQuery, (req, res) => {
  res.status(200).json(res.locals.queryInfo);
});

queryRouter.delete('/remove', userController.authorize, queryController.removeQuery, (req, res) => {
  res.status(200).json(res.locals.queryInfo);
});

// specify db id, return all queries associated with that db (dependent on user)

module.exports = queryRouter;
