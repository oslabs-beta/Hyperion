const db = require('../models/dbModel.js');
const authentication = require('./authentication.js');

const queryController ={};

queryController.addNewQuery = (req, res, next) => {

  // read request body
  const userId = res.locals.userAuth.userId;
  const { dbId, queryName, query } = req.body;

  // input validation
  if (typeof dbId !== 'number') return next(new Error());
  if (typeof queryName !== 'string') return next(new Error());
  if (typeof query !== 'object') return next(new Error());
  const { queryString, queryParams } = query;
  if (typeof queryString !== 'string') return next(new Error());
  if (!Array.isArray(queryParams) || !Array.isArray(queryParams[0])) return next(new Error());

  // verify that the user is authorized for this database id
  // stringify query object then insert into database
  const q = 'INSERT INTO app.queries (db_id, query_name, query) VALUES ($1, $2, $3) RETURNING _id;';
  const params = [dbId, queryName, JSON.stringify(query)];

  authentication.hasDbPermission(userId, dbId)
    .then(authorized => {
      if (!authorized) return next(new Error('Unauthorized'));
      return db.runQuery(q, params);
    })
    .then(result => {
      res.locals.queryInfo = { queryId: result.rows[0]._id };
      return next();
    })
    .catch(e => next(e));
  
};

queryController.removeQuery = (req, res, next) => {

};

queryController.updateQuery = (req, res, next) =>{

};

module.exports = queryController;