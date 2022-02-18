const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/signup', userController.signUp, (req, res) => {
  return res.status(200).send('User successfully created');
});

userRouter.post('/login', userController.login, (req, res) => {
  return res.status(200).send('this is the login function');
});

userRouter.post('/logout', userController.logout, (req, res) => {
 return res.status(200).send('this is the logout function');
});


module.exports = userRouter;
