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
      if (!authorized) return Promise.reject('Unauthorized');
      return db.runQuery(q, params);
    })
    .then(result => {
      res.locals.queryInfo = { queryId: result.rows[0]._id };
      return next();
    })
    .catch(e => next(e));
  
};

queryController.removeQuery = (req, res, next) => {
  //validate that user owns db that query is in  
  const userId = req.body.userAuth.userId;
  const { queryId } = req.body;

  const q = `DELETE FROM app.queries 
  WHERE _id = $1 
  AND EXISTS 
    (SELECT * 
      FROM app.databases d 
      INNER JOIN app.queries q 
      ON q.db_id = d._id
      WHERE q._id = $1 
      AND d.user_id = $2)`;
  db.runQuery(q, [queryId, userId])
    .then(() =>{
      console.log('Query has been successfully removed')
      return next();
    })
    .catch(e => next(e))
};

queryController.updateQuery = (req, res, next) =>{

};

module.exports = queryController;