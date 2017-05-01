const sql = require('../../secret/sql.js');
const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', sql.password);

module.exports = db.define('Notification', {
  type: {
  	type: Sequelize.ENUM,
    allowNull: false,
    values: ['TeamInvite', 'Promote', 'Demote'],
    noUpdate: true
  },
  viewed: {
  	type: Sequelize.BOOLEAN,
  	defaultValue: false
  } 
});