const db = require('../models/dbModel.js');

const dbController = {};


dbController.addNewDb = (req, res, next) => {

  const queryString = 'INSERT INTO databases (name, uri) VALUES ($1, $2) RETURNING _id;';
  //const queryString = Inner Join??
  //db.query(queryString, [req.body.dbInfo.dbname, req.body.uris.uri])
  db.query(queryString, [req.body.dbInfo.name, req.body.connectionDetails.uri])
    .then(r => {
      console.log(`The new id is ${r.rows[0]._id}`);
      res.locals.dbInfo = { id: r.rows[0]._id };
      return next();
    })
    .catch(e => next(e));


  
};

dbController.removeDb = (req, res, next) => {
  const queryString = 'DELETE FROM databases WHERE _id = $1 RETURNING _id, name;';
  const deletedId = req.params.id;
  db.query(queryString, [deletedId])
    .then(r => {
      console.log(`The deleted item is (${r.rows[0]._id}, ${r.rows[0].name})`);
      return next ();
    })
    .catch(e => {
      console.log(e);
      return next(e);
    } );
}

//establish connection and verify credentials are valid 
//user db 

dbController.createPool = (req, res, next) => {

};

dbController.connect = (req, res, next) => {

};

//userdb
dbController.getLatency = (req, res, next) => {

};

dbController.runQueryTests = (req, res, next) => {

};


module.exports = dbController;