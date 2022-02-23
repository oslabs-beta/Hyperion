const aws = require('../models/dbModel.js');

const dbController = {};

dbController.validateInput = (req, res, next) => {

  /*
  ** Verify variable types
  */

  if (typeof req.body.dbInfo.name !== 'string' || typeof req.body.connectionDetails.uri !== 'string') {
    // if(typeof req.body.dbInfo.dbname !== 'string' || typeof req.body.uris.uri !== 'string')
    err = {
      log: 'Name or URI is not a valid string',
      status: 400,
      message: { err: 'Please provide a valid name and URI' },
    };
    return next(err);
  }

  /*
  ** Verify that inputs are provided
  */

  if (!req.body.dbInfo.name || !req.body.connectionDetails.uri) {
    //if(!req.body.dbInfo.dbname || !req.body.uris.uri)
    err = {
      log: 'Could not find name and URI',
      status: 400,
      message: { err: 'Please provide a name and a URI' },
    };
    return next(err);
  }

  /*
  ** Verify the validity of the URI
  */
 
  const testExpression = /^postgres(ql)?:\/\//;
  const testString = req.body.connectionDetails.uri.trim();
  //const testString = req.body.uris.uri.trim()

  if(!testString.match(testExpression)){
    err = {
      log: 'Invalid URI',
      status: 400,
      message: { err: 'Invalid URI' },
    };
    return next(err);
  }

  /*
  ** Verify dbInfo exists/correct
  */

  /*
  ** Verify connection 
  */

  next();
};

dbController.addNew = (req, res, next) => {

  const queryString = 'INSERT INTO databases (name, uri) VALUES ($1, $2) RETURNING _id;';
  //const queryString = Inner Join??
  //aws.query(queryString, [req.body.dbInfo.dbname, req.body.uris.uri])
  aws.query(queryString, [req.body.dbInfo.name, req.body.connectionDetails.uri])
    .then(r => {
      console.log(`The new id is ${r.rows[0]._id}`);
      res.locals.dbInfo = { id: r.rows[0]._id };
      return next();
    })
    .catch(e => next(e));


  
};

dbController.delete = (req, res, next) => {
  const queryString = 'DELETE FROM databases WHERE _id = $1 RETURNING _id, name;';
  const deletedId = req.params.id;
  aws.query(queryString, [deletedId])
    .then(r => {
      console.log(`The deleted item is (${r.rows[0]._id}, ${r.rows[0].name})`);
      return next ();
    })
    .catch(e => {
      console.log(e);
      return next(e);
    } );
}

//establish connection and verify credentials are valid 
//user db 

dbController.createPool = (req, res, next) => {

};

dbController.connect = (req, res, next) => {

};

//userdb
dbController.getLatency = (req, res, next) => {

};


module.exports = dbController;