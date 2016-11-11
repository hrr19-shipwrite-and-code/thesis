const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');

const User = db.define('User', {
  username: { type: Sequelize.STRING, unique: true },
  email: Sequelize.STRING,
  displayPicture: Sequelize.STRING,
  authId: { type: Sequelize.INTEGER, unique: true },
  location: Sequelize.STRING,
  bio: Sequelize.TEXT('long')
});

module.exports = User;