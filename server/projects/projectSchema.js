const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');

const Project = db.define('Project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT('long'),
  views: Sequelize.INTEGER
});

module.exports = Project;