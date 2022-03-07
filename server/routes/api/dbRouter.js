const express = require('express');
const dbController = require('../../controllers/dbController');
const userController = require('../../controllers/userController');

const dbRouter = express.Router();

dbRouter.post('/new', userController.authorize, dbController.addNewDb, (req, res) => {
  res.status(200).json(res.locals.dbInfo);
});

dbRouter.delete('/remove', userController.authorize, dbController.removeDb, (req, res) => {
  res.status(200).json(res.locals.dbInfo);
});

// test connection and get latency
dbRouter.post('/testconnection', userController.authorize, dbController.connect, dbController.verifyTLS, (req, res) => {
  res.status(200).send('testconnection endpoint')
});

dbRouter.post('/runtests', userController.authorize, dbController.connect, dbController.verifyTLS, dbController.runQueryTests, (req, res) => {
  res.status(200).json(res.locals.testResults);
});

dbRouter.get('/getquerylist', userController.authorize, (req, res) => {
  res.status(200).send('getquerylist endpoint');
});

module.exports = dbRouter;
