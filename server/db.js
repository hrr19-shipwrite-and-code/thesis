const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');
const Profile = require('./profiles/profileSchema.js');
const Project = require ('./projects/projectSchema.js');
const Image = require('./projects/imageSchema.js');
const Tech = require('./tech/techSchema.js').Tech;
const ProfileTech = require('./tech/techSchema.js').ProfileTech;
const ProjectTech = require('./tech/techSchema.js').ProjectTech;

//Junction Tables
const TeamUser = db.define('TeamUsers', {});
const CommentLikes = db.define('CommentLikes', {
  type: Sequelize.STRING,
  comment: Sequelize.TEXT('long')
});

Profile.sync()
  .then(() => {
    //Creates Profile/team foreign id on project
    Profile.hasMany(Project);
    Project.belongsTo(Profile);

    Profile.belongsToMany(Profile, {as: 'Member', foreignKey: 'teamId', through: TeamUser });
    Profile.belongsToMany(Profile, {as: 'Team', foreignKey: 'userId', through: TeamUser });
    TeamUser.sync();
  })

Tech.sync()
  .then(() => {
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

        //Creating tech/profile foreign keys for ProfileTech table
        Tech.belongsToMany(Profile, {through: ProfileTech});
        Profile.belongsToMany(Tech, {through: ProfileTech});
        ProfileTech.sync();

        //Creating tech/project foreign keys for ProjectTech table
        Tech.belongsToMany(Project, {through: ProjectTech});
        Project.belongsToMany(Tech, {through: ProjectTech});
        ProjectTech.sync();
      });
  })



module.exports = {
  db: db,
  TeamUser: TeamUser,
  CommentLikes: CommentLikes,
  Tech: Tech
};
// exports.TeamUser = TeamUser;
// exports.CommentLikes = CommentLikes;
// exports.Tech = Tech;