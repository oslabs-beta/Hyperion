const db = require('../models/dbModel.js');

const queryController ={};

queryController.addNewQuery = (req, res, next) => {
  
  const queryString = 'INSERT INTO app.queries (query_name, query) VALUES ($1, $2, $3)'
  const dbId = req.body.dbInfo.id

};

queryController.removeQuery = (req, res, next) => {

};

module.exports = queryController;