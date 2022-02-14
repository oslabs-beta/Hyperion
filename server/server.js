const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = 3000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../build/index.html'));
})


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})


