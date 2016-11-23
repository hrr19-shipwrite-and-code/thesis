const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');
const Profile = require('./profiles/profileSchema.js');
const Project = require ('./projects/projectSchema.js');
const Image = require('./projects/imageSchema.js');
const Comment = require('./comments/commentSchema.js');
const Like = require('./likes/likeSchema.js');
const Notification = require('./notifications/notificationSchema.js');
const Tech = require('./tech/techSchema.js').Tech;
const ProfileTech = require('./tech/techSchema.js').ProfileTech;
const ProjectTech = require('./tech/techSchema.js').ProjectTech;
const TeamUser = require('./profiles/TeamUserSchema.js');

//Creates Profile/team foreign id on project
Profile.hasMany(Project);
Project.belongsTo(Profile);

//Creating tech/project foreign keys for ProjectTech table
Tech.belongsToMany(Project, {through: ProjectTech});
Project.belongsToMany(Tech, {through: ProjectTech});

//Creating tech/profile foreign keys for ProfileTech table
Tech.belongsToMany(Profile, {through: ProfileTech});
Profile.belongsToMany(Tech, {through: ProfileTech});

Profile.sync()
  .then(() => {

    Profile.belongsToMany(Profile, {as: 'Member', foreignKey: 'teamId', through: TeamUser });
    Profile.belongsToMany(Profile, {as: 'Team', foreignKey: 'userId', through: TeamUser });
    TeamUser.sync();


    Notification.belongsTo(Profile, {as: 'sender', foreignKey: 'recId'});
    Notification.belongsTo(Profile, {as: 'receiver', foreignKey: 'sendId'});
    Notification.sync();

  });

Tech.sync()
  .then(() => {
    Project.sync()
      .then(() => {

        //Creates Images table
        Image.belongsTo(Project);
        Project.hasMany(Image);
        Image.sync();

        //Creates Comment table
        Profile.hasMany(Comment);
        Comment.belongsTo(Profile);
        Project.hasMany(Comment);
        Comment.belongsTo(Project);
        Comment.sync();

        //Creates Like table
        Profile.hasMany(Like);
        Like.belongsTo(Profile);
        Project.hasMany(Like);
        Like.belongsTo(Project);
        Like.sync();

        ProjectTech.sync();
        ProfileTech.sync();
      });
  });



module.exports = {
  db: db,
  TeamUser: TeamUser,
  Tech: Tech
};
