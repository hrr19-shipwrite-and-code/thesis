const profileController = require('../profiles/profileController.js');
const projectController = require('../projects/projectController.js');
const techController = require('../tech/techController.js');
const likeController = require('../likes/likeController.js');
const commentController = require('../comments/commentController.js');
const jwt = require('express-jwt');
const auth = require('../../secret/auth.js')

//Checks the token for authentication when attatched to route
const authCheck = jwt({
  secret: new Buffer(auth.clientSecret, 'base64'),
  audience: auth.clientId
});

module.exports = function (app, express) {

  //User Routes

  //Signup/Login --Needs Authentication
  app.post('/api/user/create', authCheck, profileController.createUser);
  app.post('/api/team/create', profileController.createTeam);
  app.put('/api/team/edit', profileController.editTeamInfo);
  app.delete('/api/team/delete', profileController.deleteTeam);
  app.post('/api/team/addMember', profileController.addMember);
  app.delete('/api/team/removeMember', profileController.removeMember);
  app.put('/api/team/promoteMember', profileController.promoteMember);
  app.post('/api/user/addPicture', authCheck, profileController.addPicture);
  //Others to view profiles
  app.get('/api/profile/:profileUrl', profileController.getProfile);
  //Edit user profile --Needs authentication
  app.put('/api/user/edit', authCheck, profileController.editUserInfo);

  //Tech Routes
  app.post('/api/profile/addTech', authCheck, techController.profileAddTech);
  app.delete('/api/profile/removeTech', authCheck, techController.profileRemoveTech);
  app.post('/api/project/addTech', authCheck, techController.projectAddTech);
  app.delete('/api/project/removeTech', authCheck, techController.projectRemoveTech);
  app.get('/api/tech', techController.getAllTech);

  //Project Routes

  app.post('/api/project/create', authCheck,  projectController.createProject);
  app.post('/api/project/upload/:projectId', authCheck, projectController.uploadProjectImage);
  app.post('/api/project/thumbnail/:projectId', authCheck, projectController.uploadProjectThumbnail);
  app.get('/api/project/id/:projectId', projectController.getProject);
  app.get('/api/project/getAll', projectController.getAllProjects);
  app.get('/api/project/user/:id', projectController.getUserProjects);
  app.put('/api/project/edit/:projectId', authCheck, projectController.editProject);
  app.delete('/api/project/delete', authCheck, projectController.deleteProject);

  //Comment Routes
  app.post('/api/comment/create/:projectId', authCheck, commentController.addCommentToProject);
  app.delete('/api/comment/delete/:commentId', authCheck, commentController.removeComment);

  //Like routes
  app.post('/api/like/project/:projectId', authCheck, likeController.likeProject);
  //Once Auth will get GET
  app.post('/api/like/user/:projectId', authCheck, likeController.doesUserLike)
};