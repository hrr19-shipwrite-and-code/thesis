const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');

const Project = db.define('Project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT('long'),
  views: Sequelize.INTEGER,
  thumbnail: Sequelize.STRING,
  deploy: Sequelize.STRING,
  github: Sequelize.STRING,
  contribute: Sequelize.BOOLEAN,
  progress: {
    type: Sequelize.ENUM,
    values: ['Completed', 'In Progress', 'Abandonded']
  }
});

module.exports = Project;