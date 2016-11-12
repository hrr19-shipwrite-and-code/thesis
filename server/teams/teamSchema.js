const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');

const Team = db.define('Team', {
  teamname: { type: Sequelize.STRING, unique: true },
  email: Sequelize.STRING,
  displayPicture: Sequelize.STRING,
  location: Sequelize.STRING,
  bio: Sequelize.TEXT('long')
});

module.exports = Team;