const express = require('express');
const dbController = require('../../controllers/dbController');
const userController = require('../../controllers/userController');

const dbRouter = express.Router();

dbRouter.post('/new', userController.authorize, dbController.addNewDb, (req, res) => {
  res.status(200).json(res.locals.dbInfo);
});

dbRouter.delete('/delete', userController.authorize, dbController.removeDb, (req, res) => {
  res.status(200).json(res.locals.dbInfo);
});

dbRouter.post('/runtests', userController.authorize, dbController.connect, dbController.runQueryTests, (req, res) => {
  res.status(200).json(res.locals.testResults);
});

module.exports = dbRouter;
