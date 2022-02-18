const { Pool } = require('pg');
const fs = require('fs');

// create a new pool here using the connection string above
const pool = new Pool({
  ssl: {
    rejectUnauthorized: true,
    //default this is false. verifies that ca is valid 
    ca: fs.readFileSync('./global-bundle.pem').toString()
    //certifcate auth: reading the aws file to help encrypt the connection. Can encrypt w/o ca, but ca proviides additional security 
  }
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};