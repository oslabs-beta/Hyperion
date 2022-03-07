const db = require('../models/dbModel.js');
const generateCombinations = require('./generateCombinations');
const encryptionModule = require('./encryptionModule');
const globalCache = require('./globalCache');
const { Pool } = require('pg');

const dbController = {};

/**
 * Add a database to the user's list and store all associated parameters for future connections
 * 
 * @param {Object} req Request object provided by the Express framework
 * @param {Object} res Response object provided by the Express framework
 * @param {Function} next Callback function provided by the Express framework
 * @returns next() 
 */
dbController.addNewDb = (req, res, next) => {

  const encryptedUri = encryptionModule.encryptString(req.body.connectionString, globalCache.get(res.locals.userAuth.userId));
  const queryString = 'INSERT INTO app.databases (user_id, database_name, connection_type) VALUES ($1, $2, $3) RETURNING _id;';
  const uriString = 'INSERT INTO app.uris (database_id, uri) VALUES ($1, $2)';
  db.runQuery(queryString, [res.locals.userAuth.userId, req.body.dbInfo.name, req.body.connectionType])
    .then(r => {
      console.log(`The new db id is ${r.rows[0]._id}`);
      res.locals.dbInfo = { id: r.rows[0]._id };
      return db.runQuery(uriString, [res.locals.dbInfo.id, encryptedUri]);
    })
    .then(() => { next()} )
    .catch(e => next(e));
};

/**
 * Remove a database from the user's list and all stored associated parameters.  
 * This does NOT delete the actual database.
 * 
 * @param {Object} req Request object provided by the Express framework
 * @param {Object} res Response object provided by the Express framework
 * @param {Function} next Callback function provided by the Express framework
 * @returns next() 
 */
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

/**
 * Attempts to establish a database connection using the provided parameters
 * If successful, stores a pg Pool object in res.locals.dbInfo.pool
 * 
 * @param {Object} req Request object provided by the Express framework
 * @param {Object} res Response object provided by the Express framework
 * @param {Function} next Callback function provided by the Express framework
 * @returns next() 
 */
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
      const encryptedUri = r2.rows[0].uri;

      const URI = encryptionModule.decryptString(encryptedUri, globalCache.get(res.locals.userAuth.userId));

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
        ssl: { 
          rejectUnauthorized: false, 
          // set default to require to confer protection from eavesdropping
          sslmode: 'require' 
        }
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

dbController.verifyTLS = (req, res, next) => {
  const q = 'select * from pg_stat_ssl where pid = pg_backend_pid()';

  res.locals.dbInfo.pool.query(q)
    .then(r => {
      console.log(`Secure connection established using ${r.rows[0].version}`);
      if (!r.rows[0].ssl) return next('Error establishing TLS connection');
      if (r.rows[0].version !== 'TLSv1.2' &&
          r.rows[0].version !== 'TLSv1.3') {
            return next('Error establishing TLS connection');
      } 
      return next();
    })
    .catch(e => next(e));
}

/**
 * Handles and coordinates the database requests to be evaluated.
 * 
 * @param {Object} req Request object provided by the Express framework
 * @param {Object} res Response object provided by the Express framework
 * @param {Function} next Callback function provided by the Express framework
 * @returns next() 
 */
dbController.runQueryTests = (req, res, next) => {
  const pool = res.locals.dbInfo.pool;
  const { queryString, queryParams, repeat, throttle } = req.body.query;
  const promisesArray = [];
  if (throttle < 0 || repeat < 1) return next('Incorrect parameters');
  let waitUntil = Date.now() - throttle;
  // get all the combinations of parameters
  const combinations = generateCombinations(queryParams);

  // logic to send a query to the user's database
  const sendQuery = (params, queryFunc) => {
    if (throttle === 0) { //if there is no throttle, send request immediately
      return promisesArray.push(queryFunc(queryString, params, pool)
        .then(r => r)
        .catch(() => null));
    } 
    // if there is a throttle, queue and delay the request
    const delay = Math.max(0, waitUntil - Date.now());
    setTimeout(() => 
    promisesArray.push(queryFunc(queryString, params, pool)
      .then(r => r)
      .catch(() => null)), 
      delay);
    waitUntil = Math.max(waitUntil, Date.now()) + throttle;
  };

  // Send a request using both db.runExplainAnalyze and db.runQueryAnalyze
  // Use two methods for accuracy and statistical significance
  const queueRequestPair = (params) => {
    sendQuery(params, db.runExplainAnalyze);
    sendQuery(params, db.runQueryAnalyze);
  };

  // Invoke Promise.all once all the requests have been sent  
  const sendResults = () => {
    // Length of promisesArray should be equal to ( combinations.length * repeat * 2 )
    if (promisesArray.length < combinations.length * repeat * 2) return next('Error: Promise.all cannot run yet');
    Promise.all(promisesArray)
    .then(arr => {
      // Sort the results by starting timestamp in ascending order
      res.locals.testResults = arr.sort((a, b) => a.startTimestamp - b.startTimestamp);
      return next();
    })
    .catch(e => next(e));
  };
  
  // Outer loop to repeat the tests if requested
  for (let i = 0; i < repeat; i++) {
    for (const params of combinations) {
      // Test the query for this combination of parameters
      queueRequestPair(params);
    }
    if (i + 1 === repeat) { // once all the requests have been sent/queued, queue Promise.all
      if (throttle === 0) sendResults();
      else setTimeout(sendResults, Math.max(0, waitUntil - Date.now()));
    } 
  }

};

module.exports = dbController;
