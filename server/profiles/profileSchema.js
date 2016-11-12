const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');

const Profile = db.define('Profile', {
  username: { type: Sequelize.STRING, unique: true },
  teamname: { type: Sequelize.STRING, unique: true },
  email: Sequelize.STRING,
  displayPicture: Sequelize.STRING,
  authId: { type: Sequelize.INTEGER, unique: true },
  location: Sequelize.STRING,
  bio: Sequelize.TEXT('long'),
  type: Sequelize.STRING
});

module.exports = Profile;