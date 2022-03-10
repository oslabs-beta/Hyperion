const db = require('../models/dbModel.js');
const generateCombinations = require('./generateCombinations');
const statsController = require('./statsController');
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

  if (req.body.dbInfo.connectionType === 'URI') {
    const encryptedUri = encryptionModule.encryptString(req.body.dbInfo.connectionString, globalCache.get(res.locals.userAuth.userId));
    const queryString = 'INSERT INTO app.databases (user_id, database_name, connection_type) VALUES ($1, $2, $3) RETURNING _id;';
    const uriString = 'INSERT INTO app.uris (database_id, uri) VALUES ($1, $2)';
    db.runQuery(queryString, [res.locals.userAuth.userId, req.body.dbInfo.dbname, req.body.dbInfo.connectionType])
      .then(r => {
        console.log(`The new db id is ${r.rows[0]._id}`);
        res.locals.dbInfo = {
          "dbInfo": {
            "id": r.rows[0]._id
          }
        };
        return db.runQuery(uriString, [res.locals.dbInfo.dbInfo.id, encryptedUri]);
      })
      .then(() => next())
      .catch(e => next(e));
  } else if (req.body.dbInfo.connectionType === 'CONNECTION_PARAMS') {
    return next();
  } else {
    return next('Incorrect parameters');
  }
  
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

  console.log('CONNECT!')

  db.runQuery(`select 
  q._id, q.db_id, q.query_name, q.query
  from app.queries q
  inner join app.databases d
  on q.db_id = d._id
  where d.user_id = $1
  and q._id = $2`, [res.locals.userAuth.userId, req.body.queryId])
    .then(results => {
      if (!results.rows.length) return next('No result');
      const { db_id } = results.rows[0];

      // retrieve the db id from body
      const dbId = db_id;
      const uid = res.locals.userAuth.userId;

      // verify that the db belongs to the user account making the request
      db.runQuery(`SELECT FROM app.databases WHERE _id = $1 AND user_id = $2`, [dbId, uid])
      .then(r => {
        console.log('this is r in dbController.connect', r)
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
        console.log(uid);

        const URI = encryptionModule.decryptString(encryptedUri, globalCache.get(uid));
        console.log(URI);

        // connect to the pool
        const pool = new Pool({
          connectionString: URI,
          max: 1,
          ssl: { 
            rejectUnauthorized: false, 
          }
        });
        // return a pool object
        console.log('ESTABLISHING CONNECTIONS');
        return pool.query('SELECT 1;')
          .then(() => {
            console.log(`Connection established`)
            res.locals.dbInfo = { pool };
            return next();
          })
    })
    })
    .catch(e => next(e));
};

/**
 * Handles and coordinates the database requests to be evaluated.
 * 
 * @param {Object} req Request object provided by the Express framework
 * @param {Object} res Response object provided by the Express framework
 * @param {Function} next Callback function provided by the Express framework
 * @returns next() 
 */
dbController.runQueryTests = (req, res, next) => {

  console.log('run TESTS');
  const pool = res.locals.dbInfo.pool;
  const { queryId } = req.body;

  // console.log([res.locals.userAuth.userId, queryId]);

  db.runQuery(`select 
  q._id, q.db_id, q.query_name, q.query
  from app.queries q
  inner join app.databases d
  on q.db_id = d._id
  where d.user_id = $1
  and q._id = $2`, [res.locals.userAuth.userId, queryId])
    .then(results => {
      if (!results.rows.length) return next('No result');
      const { queryString, queryParams, throttle, repeat } = JSON.parse(results.rows[0].query);
      console.log(queryString, queryParams, throttle, repeat)
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
          res.locals.testResults = {
            summaryStats: statsController.calculateStats(arr.filter(e => !!e).map(element => element.queryTime)),
            testData: arr.sort((a, b) => a.startTimestamp - b.startTimestamp)
          }; 
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
          if (throttle === 0) sendResults(); // NICK: might need to add return here 
          else setTimeout(sendResults, Math.max(0, waitUntil - Date.now()));
        } 
      }
    })
    .catch(e => next(e));

  

};

module.exports = dbController;
