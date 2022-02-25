const db = require('../models/dbModel.js');
const { Pool } = require('pg');

const dbController = {};

dbController.addNewDb = (req, res, next) => {
  const queryString = 'INSERT INTO app.databases (user_id, database_name, connection_type) VALUES ($1, $2, $3) RETURNING _id;';
  const uriString = 'INSERT INTO app.uris (database_id, uri) VALUES ($1, $2)';
  db.runQuery(queryString, [res.locals.userAuth.userId, req.body.dbInfo.dbname, req.body.connectionType])
    .then(r => {
      console.log(`The new db id is ${r.rows[0]._id}`);
      res.locals.dbInfo = { id: r.rows[0]._id };
      return db.runQuery(uriString, [res.locals.dbInfo.id, req.body.connectionString]);
    })
    .then(() => next())
    .catch(e => next(e));
};

dbController.removeDb = (req, res, next) => {
  const uriString = 'DELETE FROM app.uris WHERE database_id = $1';
  const queryString = 'DELETE FROM app.databases WHERE _id = $1 RETURNING _id';
  const deletedId = req.body.dbInfo.id;
  db.runQuery(uriString, [deletedId])
    .then(() => db.runQuery(queryString, [deletedId]))
    .then(() => {
      res.locals.dbInfo = { id: r.rows[0]._id };
      console.log('Successfully removed DB from list');
      return next();
    })
    .catch(e => next(e));
}

dbController.connect = (req, res, next) => {

  // retrieve the db id from body
  // req.body.dbInfo.id
    
  // verify that the db belongs to the user account making the request
  // res.locals.authInfo.authenticated 
  // res.locals.authInfo.userId

  // retrieve the connection URI with a join on the user id

  const queryString = 'SELECT _id FROM app.databases INNER JOIN app.uris WHERE _id = db_id';
  const queryParams = [req.body.dbInfo.connectionString];

  const URI = '';

  // connect to the pool
  const pool = new Pool({
    connectionString: URI,
    connectionTimeoutMillis: 10000,
    query_timeout: 10000,
    statement_timeout: 10000,
    idleTimeoutMillis: 30000,
    ssl: { rejectUnauthorized: false }
  });
  // return a pool object
  const t1 = Date.now();
  pool.query('SELECT 1')
    .then(() => {
      const t2 = Date.now();
      console.log(`Connection established in ${t2 - t1}ms`)
      res.locals.dbInfo.pool = pool;
      return next();
    })
    .catch(e => next(e));

};


dbController.runQueryTests = (req, res, next) => {
  // receives a pool object in res.locals.dbInfo.pool
  // also needs to know the query string
  // also needs to know the query parameters


};


module.exports = dbController;