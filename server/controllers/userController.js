const aws = require('../models/dbModel.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const SALT_ROUNDS = 10;

const userController = {};

userController.signUp = (req, res, next) => {

  /* Step 1: Validate input */
  if(!req.body.userInfo 
      || typeof req.body.userInfo.username !== 'string' 
      || req.body.userInfo.username.length < 4
      || typeof req.body.userInfo.password !== 'string'
      || req.body.userInfo.password.length < 4){
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
      return aws.query(queryString, [req.body.userInfo.username, hash]) // returns a promise
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
  next();
}

userController.logout = (req, res, next) => {
  next();
}

// checking session cookie, making sure its a valid session and assoc w/ user if it is 
userController.authenticate = (req, res, next) => {
  next();
}



module.exports = userController;