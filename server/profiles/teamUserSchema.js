const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');

module.exports = db.define('TeamUsers', {
  type: {
    type: Sequelize.ENUM,
    values: ['Owner', 'Admin', 'Member', 'Pending'],
    allowNull: false
  }
});