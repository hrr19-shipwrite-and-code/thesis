const sql = require('../../secret/sql.js');
const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', sql.password);

const Images = db.define('Images', {
  url: Sequelize.STRING
}, {timestamps: false });

module.exports = Images;