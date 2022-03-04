const db = require('../models/dbModel.js');
const generateCombinations = require('./generateCombinations');
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

      if (req.body.query.maxConnections < 1 || req.body.query.maxConnections > 100) {
        return next('Invalid number of max connections');
      }

      // connect to the pool
      const pool = new Pool({
        connectionString: URI,
        connectionTimeoutMillis: 10000,
        max: req.body.query.maxConnections,
        query_timeout: 10000,
        statement_timeout: 10000,
        idleTimeoutMillis: 30000,
        ssl: { rejectUnauthorized: false }
      });
      // return a pool object
      const t1 = Date.now();
      return pool.query('SELECT 1')
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
  const pool = res.locals.dbInfo.pool;
  const { queryString, queryParams, repeat, throttle } = req.body.query;

  const promisesArray = [];

  // get all the combinations and run them
  const combinations = generateCombinations(queryParams);

  let lastRequestSent = 0;

  function cb(params, methodFunc) {
    if (Date.now() - lastRequestSent >= throttle) {
      promisesArray.push(methodFunc(queryString, params, pool)
        .then(r => r)
        .catch(() => null)
      );
      lastRequestSent = Date.now();
    } else {
      setTimeout(() => cb(params, methodFunc), throttle);
    }
    
  }

  for (let i = 0; i < repeat; i++) {
    for (const params of combinations) {
      cb(params, db.runExplainAnalyze);
      cb(params, db.runQueryAnalyze);
    }
  }
  
  function promises() {
    if (promisesArray.length < combinations.length * repeat * 2) {
      console.log('sorry we have to wait a little bit longer');
      setTimeout(() => promises(), throttle);
      return;
    }
    Promise.all(promisesArray)
    .then(arr => {
      res.locals.testcombinations = arr.sort((a, b) => a.startTimestamp - b.startTimestamp);
      return next();
    })
    .catch(e => {
      console.log('error is here');
      next(e);
    });
  }

  promises();

};

module.exports = dbController;
