const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');

const Profile = db.define('Profile', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    },
    noUpdate: true
  },
  picture: Sequelize.STRING,
  authId: {
    type: Sequelize.STRING,
    unique: true,
    noUpdate: true
  },
  location: Sequelize.STRING,
  bio: Sequelize.TEXT('long'),
  hire: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  type: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['Team', 'Member'],
    noUpdate: true
  },

  //elsewhere
  facebook: Sequelize.STRING,
  twitter: Sequelize.STRING,
  personal: Sequelize.STRING,
  blog: Sequelize.STRING,
  github: Sequelize.STRING,
  linkedin: Sequelize.STRING
});

module.exports = Profile;