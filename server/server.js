require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { authenticate } = require('./controllers/userController');
const apiRouter = require('./routes/apiRouter');

const PORT = process.env.PORT;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use('*', authenticate);

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../build/index.html'));
})

app.use('/api', apiRouter);

// 404 Error handler
app.use('/', (req, res) => {
  return res.status(404).send('Page not found');
});

// Global error handler
app.use((err, req, res, next) => {
  console.log(err)
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
