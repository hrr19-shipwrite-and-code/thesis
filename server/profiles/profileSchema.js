const sql = require('../../secret/sql.js');
const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', sql.password);

const Profile = db.define('Profile', {
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      notIn: [['', ' ']]
    }
  },
  url: {
    type: Sequelize.STRING(30),
    unique: true,
    allowNull: false,
    validate: {
      notIn: [['browse', 'addproject', 'createteam', 'developers', 'teams', 'project', 'notfound']],
      is: /^[a-zA-Z0-9_-]{1,30}$/
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    },
    noUpdate: true
  },
  picture: {
    type: Sequelize.STRING,
    defaultValue: './client/app/assets/group.jpg'
  },
  authId: {
    type: Sequelize.STRING,
    unique: true,
    noUpdate: true
  },
  location: Sequelize.STRING(50),
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
  facebook: Sequelize.STRING(150),
  twitter: Sequelize.STRING(150),
  personal: Sequelize.STRING(150),
  blog: Sequelize.STRING(150),
  github: Sequelize.STRING(150),
  linkedin: Sequelize.STRING(150)
});

module.exports = Profile;