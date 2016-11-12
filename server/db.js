const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');
const Profile = require('./profiles/profileSchema.js');
const Project = require ('./projects/projectSchema.js');
const Elsewhere = require('./profiles/elsewhereSchema.js');
const Image = require('./projects/imageSchema.js');

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

Profile.sync()
  .then(() => {
    Elsewhere.belongsTo(Profile);
    Profile.hasMany(Elsewhere);
    Elsewhere.sync();
  });

//Creates Profile/team foreign id on project
Profile.hasMany(Project);
Project.belongsTo(Profile);


Profile.belongsToMany(Profile, {as: 'Member', foreignKey: 'teamId', through: TeamUser });
Profile.belongsToMany(Profile, {as: 'Team', foreignKey: 'userId', through: TeamUser });
TeamUser.sync();


Project.sync()
  .then(() => {

    //Creates Images table
    Image.belongsTo(Project);
    Project.hasMany(Image);
    Image.sync();

    //Creating commentLikes foreign key
    Profile.hasMany(CommentLikes);
    CommentLikes.belongsTo(Profile);
    Project.hasMany(CommentLikes);
    CommentLikes.belongsTo(Project);
    CommentLikes.sync();

    //Creating tech foreign keys
    Tech.belongsTo(Profile);
    Profile.hasMany(Tech);
    Tech.belongsTo(Project);
    Project.hasMany(Tech);
    Tech.sync();
  });


module.exports = db;
exports.TeamUser = TeamUser;
exports.CommentLikes = CommentLikes;
exports.Tech = Tech;