const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');

const Images = db.define('Images', {
  url: Sequelize.STRING
}, {timestamps: false });

module.exports = Images;