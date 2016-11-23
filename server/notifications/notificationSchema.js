const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');

module.exports = db.define('Notification', {
  type: Sequelize.STRING,
  viewed: Sequelize.BOOLEAN
});