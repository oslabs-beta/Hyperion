const express = require('express');
const dbController = require('../../controllers/dbController')

const db = express.Router();

db.post('/new', dbController.addNewDb, (req, res) => {
  res.status(200).json(res.locals.dbInfo);
});

db.delete('/delete', dbController.removeDb, (req, res) => {
  res.status(200).json(res.locals.dbInfo);
});

db.post('/testconnect', (req, res) => {

});

db.post('/getlatency', (req, res) => {

});

db.post('/runquerytests', (req, res) => {

});

module.exports = db;
