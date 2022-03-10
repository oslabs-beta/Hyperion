const db = require("../models/dbModel");

const authentication = {};

/**
 * Verify that user owns this database. Returns true or false
 * @param {number} userId 
 * @param {number} dbId 
 * @return boolean
 */
authentication.hasDbPermission = (userId, dbId) => {

  // validate input - check data types
  if (typeof userId !== 'number' || typeof dbId !== 'number') throw new Error('Invalid input');
  if (! (userId > 0 && dbId > 0)) throw new Error('Invalid input');
  
  const q = 'SELECT * FROM app.databases WHERE _id = $1 AND user_id = $2';
  const params = [ dbId, userId ];

  return db.runQuery(q, params)
    .then(result => {
      if (!result.rows.length) return false;
      else if (result.rows[0]._id === dbId && result.rows[0].user_id === userId) return true;
      else return false;
    })
    .catch(e => { throw e; })
};


module.exports = authentication;
