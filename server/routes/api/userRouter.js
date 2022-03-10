const express = require('express');
const userController = require('../../controllers/userController');

const userRouter = express.Router();

userRouter.post('/signup', userController.signUp, (req, res) => {
  return res.status(200).send('User successfully created');
});

userRouter.post('/login', userController.login, (req, res) => {
  return res.status(200).json(res.locals.userAuth);
});

userRouter.post('/logout', userController.logout, (req, res) => {
 return res.status(200).send('User successfully logged out');
});

userRouter.get('/getinfo', userController.authorize, userController.getInfo, (req, res) => {
  return res.status(200).json(res.locals.userInfo);
});

module.exports = userRouter;
