const sql = require('../../secret/sql.js');
const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', sql.password);

module.exports = {
  Tech: db.define('Tech', {
    name: Sequelize.STRING,
    count: Sequelize.INTEGER
  }),

  ProfileTech: db.define('ProfileTech', {}),

  ProjectTech: db.define('ProjectTech', {}),
}