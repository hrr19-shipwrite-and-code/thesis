const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');

module.exports = db.define('TeamUsers', {
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});