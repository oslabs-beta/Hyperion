const db = require('../models/dbModel.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
//uuid generates randoms tring to help generate a session cookie 

const SALT_ROUNDS = 12;

const userController = {};

userController.createSession = (req, res, next) => {

};

userController.send2FACode = (req, res, next) => {
  // TBD
};

userController.verify2FACode = (req, res, next) => {
  // TBD
};

userController.signUp = (req, res, next) => {

  /* Step 1: Validate input */
  if(!req.body.userInfo 
      || typeof req.body.userInfo.username !== 'string' 
      || req.body.userInfo.username.length < 4
      || typeof req.body.userInfo.password !== 'string'
      || req.body.userInfo.password.length < 4) {
    /* Error handling if the username and/or password do not meet the specifications defined above */
    const err = {
      log: 'Invalid username or password',
      status: 400,
      message: {err: 'Please provide a valid username or password'}
    }
    return next(err);
  }
  
  /* Step 2: Create new user in database */
  const queryString =  `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING _id, username;`;
  bcrypt.hash(req.body.userInfo.password, SALT_ROUNDS)
    .then(hash => {
      return db.runQuery(queryString, [req.body.userInfo.username, hash]) // returns a promise
    })
    .then(r => {
      /* New user successfully created */
      res.locals.newUserInfo = {id: r.rows[0]._id, username: r.rows[0].username};
      console.log(`User ${r.rows[0].username} created with id ${r.rows[0]._id}`);
      return next();
    })
    .catch(e => {
      /* Error handling if the username already exists */
      if (e.constraint === 'users_username_key') {
          // constraint is returned from pg command/error when same username is entered 
        const err = {
          log: 'This username already exists.',
          status: 400,
          message: {err: 'This username already exists.'}
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
      || typeof req.body.userInfo.username !== 'string' 
      || req.body.userInfo.username.length < 4
      || typeof req.body.userInfo.password !== 'string'
      || req.body.userInfo.password.length < 4) {
  /* Error handling if the username and/or password do not meet the specifications defined above */
  const err = {
    log: 'Invalid username or password',
    status: 400,
    message: {err: 'Please provide a valid username or password'}
  }
  return next(err);
}

  /* Step 2: Verify username and password with the hash stored in the database */

  const queryString = `SELECT _id, password FROM users WHERE username = $1;`;
  const err = {
    log: 'Incorrect username and/or password',
    status: 401,
    message: {err: 'Incorrect username and/or password'}
  };
  db.runQuery(queryString, [req.body.userInfo.username])
    .then(r => {
      if (!r.rows.length) return next(err);
      res.locals.userId = r.rows[0]._id;
      return bcrypt.compare(req.body.userInfo.password, r.rows[0].password);
    })
    .then(result => {
      // hash plaintext password and compare with hash stored in database
      if(!result) return next(err);

      /* Step 3: Create a session cookie and store it in the database */
      // 1 generate ssid using uuid
      const ssid = uuid.v4();
      // 2 add ssid to database
      const ssidString = `INSERT INTO sessions (user_id, uuid) VALUES ($1, $2) RETURNING uuid;`;
      const queryParams = [res.locals.userId, ssid];
      return db.query(ssidString, queryParams);
    })
    .then(r => {
      // 3 add ssid cookie to res
      res.cookie('ssid', r.rows[0].uuid, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true });
      // 4 call next();
      return next();
    })
    .catch(e => next(e));
}

userController.logout = (req, res, next) => {
  // this will overwrite prev ssid and end curr session 
  res.cookie('ssid', '', { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true });
  return next();
}

userController.logoutAllSessions = (req, res, next) => {
  //res.cook('ssid',)
  return next();
};

// checking session cookie, making sure its a valid session and assoc w/ user if it is 
//global middleware, import into server js 
userController.authenticate = (req, res, next) => {

  res.locals.userAuth = {
    authenticated: false,
    userId: null,
    username: null
  };

  // Step 1: check the ssid cookie and get its value
  if(!req.cookies.ssid) return next();

  // Step 2: query database on sessions and join with users to get the userid and username
  // const ssidQuery = 
  // Step 2.1: if the result is not empty then update the res.locals.userAuth object

  // Step 3 return next();

  next();
}

userController.authorize = (req, res, next) => {

};

module.exports = userController;
