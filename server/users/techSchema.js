const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');

const User = db.define('Tech', {
  username: {type: Sequelize.STRING, unique: true},
  email: Sequelize.STRING,
  displayPicture: Sequelize.STRING,
  authId: Sequelize.INTEGER,
  location: Sequelize.STRING,
  bio: Sequelize.TEXT('long')
});

module.exports = User;