const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');


const Like = db.define('Like', {}, { timestamps: false });

module.exports = Like;
