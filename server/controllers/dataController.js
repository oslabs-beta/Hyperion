require('dotenv').config();
const db = require('../models/dbModel.js');
const { faker } = require('@faker-js/faker');
const fs = require('fs');
const child_process = require('child_process');

const dataController = {};

dataController.copyData = (req, res, next) => {
  let t1, t2;
  t1 = Date.now();
  let table_name = `test`;
  let column_list = `(email)`;
  let file_path = `./input.csv`;
  let login_info = `--host=${process.env.PGHOST} --dbname=${process.env.PGDATABASE} --user=${process.env.PGUSER}`;
  let command_string = `psql ${login_info} -c "\\copy ${table_name} ${column_list} from ${file_path} CSV HEADER;"`;

  console.log(command_string);

  child_process.exec(command_string, (err, stdout, stderr) => {
    if (err) {
      console.log('there was an error')
      console.log(`${stderr}`);
      return;
    }
    console.log(`${stdout}`);
    t2 = Date.now();
    console.log((t2 - t1) / 1000);
  });
};

dataController.getMockData = (filepath, headers) => {
  filepath = filepath || 'input.csv';
  headers = headers || 'email \n';

  let t1, t2;
  let writer = fs.createWriteStream(filepath);
  t1 = Date.now();
  writer.write(headers);
  for (let i = 0; i < 5000000; i++) {
    writer.write(faker.internet.email() + '\n');
  }
  t2 = Date.now();
  console.log((t2 - t1) / 1000);

};

dataController.getMockData();

dataController.copyData();

module.exports = dataController;