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
  const uriString = 
  `DELETE FROM app.uris
  WHERE database_id = $1
  AND EXISTS (SELECT _id FROM app.databases WHERE _id = $1 AND user_id = $2)
  `
  ;
  const queryString = 
  `DELETE FROM app.databases 
  WHERE _id = $1 
  AND user_id = $2
  RETURNING _id`;

  const deletedId = req.body.dbInfo.id;

  db.runQuery(uriString, [deletedId, res.locals.userAuth.userId])
    .then(() => db.runQuery(queryString, [deletedId, res.locals.userAuth.userId]))
    .then(r => {
      res.locals.dbInfo = { id: deletedId };
      console.log('Successfully removed DB from list');
      return next();
    })
    .catch(e => next(e));
}

dbController.connect = (req, res, next) => {

  // retrieve the db id from body
  const dbId = req.body.dbInfo.id;
  const uid = res.locals.userAuth.userId;
    
  // verify that the db belongs to the user account making the request
  db.runQuery(`SELECT FROM app.databases WHERE _id = $1 AND user_id = $2`, [dbId, uid])
    .then(r => {
      if (!r.rows.length) {
        console.log('Invalid database or credentials')
        return next('Invalid database or credentials');
      } 
      return db.runQuery(`SELECT uri FROM app.uris WHERE database_id = $1`, [dbId]);
    })
    .then(r2 => {
      if (!r2.rows.length) {
        console.log('No URI found for this database');
        return next('No URI found for this database');
      } 
      const URI = r2.rows[0].uri;

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
          res.locals.dbInfo = { pool };
          return next();
        })
    })
    .catch(e => next(e)); 

};


dbController.runQueryTests = (req, res, next) => {
  // receives a pool object in res.locals.dbInfo.pool
  // also needs to know the query string
  // also needs to know the query parameters

  const pool = res.locals.dbInfo.pool;
  const { queryString, queryParams } = req.body.query;

  //for security, checks to see if delete or drop are in the querySearch, stops whole execution and doesnt run query 
  if (queryString.search(/delete/gmi) !== -1 ||
    queryString.search(/drop/gmi) !== -1) 
    return next('Unauthorized keyword found');

  const totalTimeArray = [];
  const queryTimeArray = [];

  function calculateStats(arr) {
    const min = Math.min(...arr)
    const max = Math.max(...arr)
    const mean = arr.reduce((a,b) => a + b) / arr.length;
    let median;
    arr.sort((a,b) => a - b);
    const middle = Math.floor(arr.length / 2);
    if (arr.length % 2) {
      median= arr[middle];
    } else {
      median = (arr[middle-1] + arr[middle]) / 2;
    }
    return [min, mean, median, max];
  }

  function runTests(i = 10) {
    if (i <= 0) {
      console.log(totalTimeArray)
      console.log(queryTimeArray)
      console.log(calculateStats(totalTimeArray));
      console.log(calculateStats(queryTimeArray));
      return next();
    } 
    db.runExplainAnalyze(queryString, queryParams, pool)
    .then(r => {
      totalTimeArray.push(r.totalTime);
      queryTimeArray.push(r.queryTime);
      return runTests(i - 1);
    })
    .catch(e => next(e))
  }

  runTests();
  

};


module.exports = dbController;