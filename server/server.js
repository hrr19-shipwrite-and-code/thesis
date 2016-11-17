const express = require('express');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const multer = require('multer');
const db = require('./db.js').db;

const app = express();

const port = 1337;

app.use(express.static('./client'));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Headers, X-Requested-With');
  next();
});

require('./config/routes.js')(app, express);

app.listen(port, () => {
  console.log('Listening on port: ' + port);
});