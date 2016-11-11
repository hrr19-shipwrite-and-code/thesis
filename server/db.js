const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');
const User = require('./users/userSchema.js');
const Project = require ('./projects/projectSchema.js');

const userProject = db.define('userProject', {
});

User.belongsToMany(Project, { through: userProject });
Project.belongsToMany(User, { through: userProject });

User.sync();
Project.sync();
userProject.sync()



module.exports = db;