const profileController = require('../profiles/profileController.js');
const projectController = require('../projects/projectController.js');
const techController = require('../tech/techController.js');
const likeController = require('../likes/likeController.js');
const commentController = require('../comments/commentController.js');
// const jwt = require('express-jwt');
// const auth = require('../../secret/auth.js');
const middleware = require('./middleware.js');
//const multer = require('multer');

// //Checks the token for authentication when attatched to route
// const authCheck = jwt({
//   secret: new Buffer(auth.clientSecret, 'base64'),
//   audience: auth.clientId
// });

module.exports = function (app, express) {

  //User Routes

  //Signup/Login --Needs Authentication
  app.post('/api/user/create', middleware.authCheck, profileController.createUser);
  app.post('/api/team/create', profileController.createTeam);
  app.put('/api/team/edit', profileController.editTeamInfo);
  app.delete('/api/team/delete', profileController.deleteTeam);
  app.post('/api/team/addMember', profileController.addMember);
  app.delete('/api/team/removeMember', profileController.removeMember);
  app.put('/api/team/promoteMember', profileController.promoteMember);
  app.post('/api/user/addPicture', middleware.authCheck, middleware.uploadProfilePicture.any(), profileController.addPicture);
  app.get('/api/profile/:profileUrl', profileController.getProfile);
  app.get('/api/editUserInfo', middleware.authCheck, profileController.getEditUserInfo);
  app.put('/api/user/edit', middleware.authCheck, profileController.editUserInfo);

  //Tech Routes
  app.post('/api/profile/addTech', middleware.authCheck, techController.profileAddTech);
  app.delete('/api/profile/removeTech', middleware.authCheck, techController.profileRemoveTech);
  app.post('/api/project/addTech', middleware.authCheck, techController.projectAddTech);
  app.delete('/api/project/removeTech', middleware.authCheck, techController.projectRemoveTech);
  app.get('/api/tech', techController.getAllTech);

  //Project Routes
  app.post('/api/project/create', middleware.authCheck,  projectController.createProject);
  app.get('/api/project/id/:projectId', projectController.getProject);
  app.get('/api/project/getAll', projectController.getAllProjects);
  app.get('/api/project/user/:id', projectController.getUserProjects);
  app.put('/api/project/edit/:projectId', middleware.authCheck, projectController.editProject);
  app.delete('/api/project/delete', middleware.authCheck, projectController.deleteProject);

  //Project Images
  app.post('/api/project/upload/:projectId', middleware.authCheck, middleware.uploadProjectPicture.any(), projectController.uploadProjectImage);
  //Attatch authentication when access to edit profile
  app.put('/api/project/thumbnail/:projectId', projectController.updateProjectThumbnail);
  app.delete('/api/project/image/:projectId', projectController.deleteProjectImage);


  //Comment Routes
  app.post('/api/comment/create/:projectId', middleware.authCheck, commentController.addCommentToProject);
  app.delete('/api/comment/delete/:commentId', middleware.authCheck, commentController.removeComment);

  //Like routes
  app.post('/api/like/project/:projectId', middleware.authCheck, likeController.likeProject);
  //Once Auth will get GET
  app.get('/api/like/user/:projectId', middleware.authCheck, likeController.doesUserLike)
};
