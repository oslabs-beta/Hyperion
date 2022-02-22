require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');

// create a new pool here using the connection string above
const pool = new Pool({
  ssl: {
    rejectUnauthorized: true,
    //default this is false. verifies that ca is valid 
    ca: fs.readFileSync('./global-bundle.pem').toString(),
    //certifcate auth: reading the aws file to help encrypt the connection. Can encrypt w/o ca, but ca proviides additional security 
  }
});



const runQueryAnalyze = async (innerQuery, params) => {
  // note: we don't try/catch this because if connecting throws an exception
  // we don't need to dispose of the client (it will be undefined)
  let timeStart, timeConnect, timeQueryStart, timeQueryEnd;
  let res;

  timeStart = Date.now();
  const client = await pool.connect();
  timeConnect = Date.now();
  const connectionTime = timeConnect - timeStart;
  try {
    const queryText = `
    SELECT clock_timestamp()::text as beforebegin;
    BEGIN;
    SELECT clock_timestamp()::text as beforequery; 
    ${innerQuery}
    SELECT clock_timestamp()::text as afterquery;
    ROLLBACK;
    SELECT clock_timestamp()::text as afterrollback;`;
    timeQueryStart = Date.now();
    res = await client.query(queryText, params);
    timeQueryEnd = Date.now();
  } catch (e) {
    await client.query('ROLLBACK');
    throw new Error(e);
  } finally {
    client.release();
    const beforeBegin = res[0].rows[0].beforebegin.slice(20, 26);
    const beforeQuery = res[2].rows[0].beforequery.slice(20, 26);
    const afterQuery = res[4].rows[0].afterquery.slice(20, 26);
    const afterRollback = res[6].rows[0].afterrollback.slice(20, 26);
    const queryTime = ((afterQuery - beforeQuery) / 1000).toFixed(2);
    const totalTime = ((afterRollback - beforeBegin) / 1000).toFixed(2);
    const otherTime = (totalTime - queryTime).toFixed(2);
    console.log(queryTime, totalTime, otherTime);
    console.log('=== QUERY STATS ===')
    console.log(`Pool setup time: ${connectionTime}ms`);
    const totalQueryRuntime = timeQueryEnd - timeQueryStart;
    const latency = totalQueryRuntime - totalTime;
    console.log(`Total query runtime (incl. latency): ${totalQueryRuntime}ms`);
    console.log(`Query time: ${queryTime}ms`);
    console.log(`Other transaction time: ${otherTime}ms`);
    console.log(`Total query processing time: ${totalTime}ms`);
    console.log(`Latency ${latency}ms`)
    return res;
  }
};

runQueryAnalyze('select username from users order by username asc limit 2;')
  .then(r => console.log('success'));




// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = runQueryAnalyze;