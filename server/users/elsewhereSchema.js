const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');

const Elsewhere = db.define('elsewhere',
  {
    url: Sequelize.STRING,
    type: Sequelize.STRING
  },
  {
    timestamps: false,
  });

module.exports = Elsewhere;