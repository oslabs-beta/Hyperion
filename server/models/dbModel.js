require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');

const defaultPool = new Pool({ // uses environment variables
  ssl: { // use certifcate auth provided by AWS
    rejectUnauthorized: true,
    ca: fs.readFileSync('./us-east-1-bundle.pem').toString()
  }
});

const db = {};

db.runQuery = async (queryText, params, pool = defaultPool) => {
  const client = await pool.connect();

  try {
    let res = await client.query(queryText, params);
    return res;
  } catch (e) {
    throw e;
  } finally {
    client.release();
  }
};
//
db.runQueryAnalyze = async (queryText, params, pool = defaultPool) => {
  const client = await pool.connect();

  try {
    const getClockTime = 'SELECT clock_timestamp()::text;';
    let timing = {};
    if (queryText[queryText.length - 1] !== ';') queryText = queryText + ';';

    /* === QUERY START === */
    const init = Date.now();
    let res = await client.query(`${getClockTime} ${queryText} ${getClockTime}`, params);
    const end = Date.now();
    /* === QUERY END === */

    /* String manipulation */
    timing.totalTime = Number.parseInt(end - init);
    const queryStart = Number.parseFloat(res[0].rows[0].clock_timestamp.slice(17).slice(0, -3));
    const queryEnd = Number.parseFloat(res[2].rows[0].clock_timestamp.slice(17).slice(0, -3));
    if (queryStart > queryEnd) throw new Error('Timing issue, please try again');
    timing.queryTime = Number.parseFloat(((queryEnd - queryStart) * 1000).toFixed(2));

    // return object
    return timing;
  } catch (e) {
    throw e;
  } finally {
    client.release();
  }
};

//has overhead and doesnt include io costs. 
db.runExplainAnalyze = async (queryText, params, pool = defaultPool) => {
  const client = await pool.connect();

  try {
    const getClockTime = 'SELECT clock_timestamp()::text;';
    let timing = {};
    if (queryText[queryText.length - 1] !== ';') queryText = queryText + ';';

    /* === QUERY START === */
    const init = Date.now();
    let res = await client.query(`${getClockTime} EXPLAIN ANALYZE ${queryText} ${getClockTime}`, params);
    const end = Date.now();
    /* === QUERY END === */

    /* String manipulation */
    timing.totalTime = Number.parseInt(end - init);
    const queryPlan = res[1].rows.slice(-2);
    timing.planningTime = parseFloat(parseFloat(queryPlan[0]['QUERY PLAN'].slice(15, -3)).toFixed(2));
    timing.executionTime = parseFloat(parseFloat(queryPlan[1]['QUERY PLAN'].slice(16, -3)).toFixed(2));
    timing.queryTime = parseFloat((timing.planningTime + timing.executionTime).toFixed(2));

    // return object
    return timing;
  } catch (e) {
    throw e;
  } finally {
    client.release();
  }
};


/* === SAMPLE CODE START === */

// db.runQuery('select count(*) from users;')
//   .then(r => console.log('success'))
//   .catch(e => console.log('error caught')); 

// db.runExplainAnalyze('select count(*) from users;')
//   .then(r => console.log(r))
//   .catch(e => console.log('error caught'));

// db.runQueryAnalyze('select count(*) from users;')
//   .then(r => console.log(r))
//   .catch(e => console.log('error caught')); 
  
/* === SAMPLE CODE END === */


module.exports = db;