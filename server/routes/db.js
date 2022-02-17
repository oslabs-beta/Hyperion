const express = require('express');
const dbController = require('../controllers/dbController')

const db = express.Router();

db.post('/new', dbController.validateInput, dbController.addNew, (req, res) => {
  res.status(200).json(res.locals.dbInfo);
});

db.delete('/delete/:id', dbController.delete, (req, res) => {
  res.status(200).json(res.locals.dbInfo);
});

module.exports = db;
