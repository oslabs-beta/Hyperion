const db = require('../models/dbModel.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const globalCache = require('./globalCache');

const SALT_ROUNDS = 12;

const userController = {};

userController.signUp = (req, res, next) => {

  /* Step 1: Validate input */
  if(!req.body.userInfo 
      || typeof req.body.userInfo.email !== 'string' 
      || typeof req.body.userInfo.name !== 'string' 
      || typeof req.body.userInfo.password !== 'string') {
    /* Error handling if the username and/or password do not meet the specifications defined above */
    const err = {
      log: 'Invalid email or password',
      status: 400,
      message: {err: 'Please provide a valid email and password'}
    }
    return next(err);
  }
  
  /* Step 2: Create new user in database */
  const queryString =  `INSERT INTO app.users (email, name, pwd) VALUES ($1, $2, $3) RETURNING _id;`;
  bcrypt.hash(req.body.userInfo.password, SALT_ROUNDS)
    .then(hash => {
      return db.runQuery(queryString, [req.body.userInfo.email, req.body.userInfo.name, hash]); // returns a promise
    })
    .then(r => {
      /* New user successfully created */
      res.locals.newUserInfo = {id: r.rows[0]._id};
      console.log(`User ${r.rows[0]._id} created`);
      return next();
    })
    .catch(e => {
      /* Error handling if the username already exists */
      if (e.constraint === 'users_email_key') {
          // constraint is returned from pg command/error when same username is entered 
        const err = {
          log: 'This email already exists.',
          status: 400,
          message: {err: 'This email already exists.'}
        }
        return next(err);
      }
      /* All other errors */
      return next(e);
    });
  
};

userController.login = (req, res, next) => {

  /* Step 1: Validate input to pass in as format we are expecting*/
  if (!req.body.userInfo 
      || typeof req.body.userInfo.email !== 'string' 
      || typeof req.body.userInfo.password !== 'string') {
  /* Error handling if the username and/or password do not meet the specifications defined above */
  const err = {
    log: 'Invalid email or password',
    status: 400,
    message: {err: 'Please provide a valid email or password'}
  }
  return next(err);
}

  /* Step 2: Verify username and password with the hash stored in the database */

  const queryString = `SELECT _id, pwd FROM app.users WHERE email = $1;`;
  const err = {
    log: 'Incorrect email and/or password',
    status: 401,
    message: {err: 'Incorrect email and/or password'}
  };
  db.runQuery(queryString, [req.body.userInfo.email])
    .then(r => {
      if (!r.rows.length) return next(err);
      res.locals.userId = r.rows[0]._id;
      return bcrypt.compare(req.body.userInfo.password, r.rows[0].pwd);
    })
    .then(result => {
      // hash plaintext password and compare with hash stored in database
      if(!result) return next(err);

      /* Step 3: Create a session cookie and store it in the database */
      // 1 generate ssid using uuid
      const ssid = uuid.v4();
      // 2 add ssid to database
      const ssidString = `INSERT INTO app.sessions (user_id, ssid) VALUES ($1, $2) RETURNING ssid;`;
      const queryParams = [res.locals.userId, ssid];
      return db.runQuery(ssidString, queryParams);
    })
    .then(r => {
      // add password to volatile local cache for AES encryption/decryption
      globalCache.set(res.locals.userId, req.body.userInfo.password);
      // 3 add ssid cookie to res
      res.cookie('ssid', r.rows[0].ssid, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true });
      // set the values in the userAuth object
      res.locals.userAuth = {
        authenticated: true,
        userId: res.locals.userId
      };

      // 4 call next();
      return next();
    })
    .catch(e => next(e));
}

userController.logout = (req, res, next) => {
  // remove password from local cache
  globalCache.clear(res.locals.userAuth.userId);
  // this will overwrite prev ssid and end curr session 
  res.cookie('ssid', '', { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true });
  return next();
}


// checking session cookie, making sure its a valid session and assoc w/ user if it is 
//global middleware, import into server js 
userController.authenticate = (req, res, next) => {

  console.log('authenticate middleware');
  res.locals.userAuth = {
    authenticated: false,
    userId: null
  };

  
  // Step 1: check the ssid cookie and get its value
  if(!req.cookies.ssid || !uuid.validate(req.cookies.ssid) || !uuid.version === 4) {
    console.log(`No valid ssid found`);
    return next();
  } 

  // Step 2: query database on sessions to get user id
  const ssidQuery = `SELECT user_id FROM app.sessions WHERE ssid = $1`;
  const params = [req.cookies.ssid];
  // Step 2.1: if the result is not empty then update the res.locals.userAuth object
  db.runQuery(ssidQuery, params)
    .then(r => {
      
      if (!r.rows.length) {
        console.log(`User not authenticated`);
        return next();
      } 
      res.locals.userAuth.userId = r.rows[0].user_id;
      res.locals.userAuth.authenticated = true;
      console.log(`User ${res.locals.userAuth.userId} authenticated`)
      return next();
    })
    .catch(e => next(e));
  
}

/**
 * Blocks requests that do not have a valid session
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
userController.authorize = (req, res, next) => {
  if (!res.locals.userAuth.authenticated) {
    const err = {
      log: 'User not authorized',
      status: 403,
      message: {err: 'User not authorized'}
    }
    return next(err);
  }
  if (!globalCache.get(res.locals.userAuth.userId)) {
    const err = {
      log: 'Error: Please log in again',
      status: 403,
      message: {err: 'Please log in again'}
    }
    return next(err);
  }
  return next();
};

module.exports = userController;
