const express = require('express');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const multer = require('multer');
const db = require('./db.js');

const app = express();

const port = 3000;

app.use(express.static('../client'));
app.use(bodyParser.json());

//require('./config/routes.js')(app, express);

app.listen(port, () => {
  console.log('Listening on port: ' + port);
});