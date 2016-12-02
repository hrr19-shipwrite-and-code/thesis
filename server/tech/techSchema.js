const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');

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