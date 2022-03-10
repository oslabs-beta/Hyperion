const db = require('../models/dbModel.js');
const authentication = require('./authentication.js');

const queryController ={};

queryController.addNewQuery = (req, res, next) => {

  // read request body
  const userId = res.locals.userAuth.userId;

  // verify that the user is authorized for this database id
  // stringify query object then insert into database
  const q = 'INSERT INTO app.queries (db_id, query_name, query) VALUES ($1, $2, $3) RETURNING _id;';
  const params = [req.body.dbId, req.body.queryName, JSON.stringify(req.body.query)];

  authentication.hasDbPermission(userId, req.body.dbId)
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
  const userId = res.locals.userAuth.userId;
  const { queryId } = req.body;

  if(!queryId) return next(new Error ());

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
      console.log(`Query ${queryId} has been successfully removed`)
      return next();
    })
    .catch(e => next(e))
};


queryController.updateQuery = (req, res, next) =>{
  return next();
};

module.exports = queryController;