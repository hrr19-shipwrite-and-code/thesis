const sql = require('../../secret/sql.js');
const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', sql.password);


const Like = db.define('Like', {}, { timestamps: false });

module.exports = Like;
