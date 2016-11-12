const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');
const User = require('./users/userSchema.js');
const Project = require ('./projects/projectSchema.js');
const Elsewhere = require('./users/elsewhereSchema.js');
const Image = require('./projects/imageSchema.js');
const Team = require('./teams/teamSchema.js');

//Junction Tables
const TeamUser = db.define('TeamUsers', {});
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

//Creates user/team foreign id on project
Team.hasMany(Project);
Project.belongsTo(Team);
User.hasMany(Project);
Project.belongsTo(User);

Team.sync()
  .then(() => {
    User.belongsToMany(Team, { through: TeamUser });
    Team.belongsToMany(User, { through: TeamUser });
    TeamUser.sync();
  });

Project.sync()
  .then(() => {

    //Creates Images table
    Image.belongsTo(Project);
    Project.hasMany(Image);
    Image.sync();

    //Creating commentLikes foreign key
    User.hasMany(CommentLikes);
    CommentLikes.belongsTo(User);
    Project.hasMany(CommentLikes);
    CommentLikes.belongsTo(Project);
    CommentLikes.sync();

    //Creating tech foreign keys
    Tech.belongsTo(User);
    User.hasMany(Tech);
    Tech.belongsTo(Project);
    Project.hasMany(Tech);
    Tech.sync();
  });


module.exports = db;
exports.TeamUser = TeamUser;
exports.CommentLikes = CommentLikes;
exports.Tech = Tech;