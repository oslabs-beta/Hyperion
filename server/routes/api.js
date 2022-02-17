const express = require('express');
const db = require('./db');
const api = express.Router();


api.use('/db', db);


module.exports = api;