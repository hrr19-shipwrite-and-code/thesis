const sql = require('../../secret/sql.js');
const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', sql.password);

module.exports = {
  Tech: db.define('Tech', {
    name: Sequelize.STRING(20),
    count: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  }),

  ProfileTech: db.define('ProfileTech', {}),

  ProjectTech: db.define('ProjectTech', {}),
}