const validate = require

const val = {}

val.validateDbInput = (req, res, next) => {

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


  next();
};

module.exports = inputValidation;