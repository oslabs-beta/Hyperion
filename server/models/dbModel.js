require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');

const defaultPool = new Pool({ // uses environment variables
  connectionTimeoutMillis: 10000,
  // defauly connetion doesnt have default
  query_timeout: 10000,
  statement_timeout: 10000,
  // keeps pool open forever once client opens it 
  idleTimeoutMillis: 30000,
  max: 10,
  ssl: { // use certifcate auth provided by AWS for North California region (us-west-1)
    rejectUnauthorized: true,
    ca: fs.readFileSync('./us-west-1-bundle.pem').toString()
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
    let timing = {};
    if (queryText[queryText.length - 1] !== ';') queryText = queryText + ';';

    /* === QUERY START === */
    const init = Date.now();
    let res = await client.query(`EXPLAIN ANALYZE ${queryText}`, params);
    const end = Date.now();
    /* === QUERY END === */

    /* String manipulation */
    timing.totalTime = Number.parseInt(end - init);
    const queryPlan = res.rows.slice(-2);
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

module.exports = db;