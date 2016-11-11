const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');
const User = require('./users/userSchema.js');
const Project = require ('./projects/projectSchema.js');
const Elsewhere = require('./users/elsewhereSchema.js');
const Image = require('./projects/imageSchema.js');

//Junction Tables
const UserProject = db.define('UserProject', {});
const CommentLikes = db.define('CommentLikes', {
  type: Sequelize.STRING,
  comment: Sequelize.TEXT('long')
});
const Tech = db.define('Tech', {
  name: Sequelize.STRING,
  type: Sequelize.STRING,
}, { timestamps: false });

User.sync()
  .then(() => {
    Elsewhere.belongsTo(User);
    User.hasMany(Elsewhere);
    Elsewhere.sync();
  });
Project.sync()
  .then(() => {
    //Creates Images table
    Image.belongsTo(Project);
    Project.hasMany(Image);
    Image.sync();

    //Creating userProject foreign key
    User.belongsToMany(Project, { through: UserProject });
    Project.belongsToMany(User, { through: UserProject });
    UserProject.sync();

    //Creating commentLikes foreign key
    User.belongsToMany(Project, { through: CommentLikes });
    Project.belongsToMany(User, { through: CommentLikes });
    CommentLikes.sync();

    //Creating tech foreign keys
    Tech.belongsTo(User);
    User.hasMany(Tech);
    Tech.belongsTo(Project);
    Project.hasMany(Tech);
    Tech.sync();
  });









module.exports = db;