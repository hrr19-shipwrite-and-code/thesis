const profileController = require('../profiles/profileController.js');
const projectController = require('../projects/projectController.js');
const techController = require('../tech/techController.js');
const likeController = require('../likes/likeController.js');
const commentController = require('../comments/commentController.js');
const middleware = require('./middleware.js');


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
  app.delete('/api/profile/removeTech/:techName', middleware.authCheck, techController.profileRemoveTech);
  app.post('/api/project/addTech', middleware.authCheck, techController.projectAddTech);
  app.delete('/api/project/removeTech/:projectId/:techId', middleware.authCheck, techController.projectRemoveTech);
  app.get('/api/tech', techController.getAllTech);

  //Project Routes
  app.post('/api/project/create', middleware.authCheck,  projectController.createProject);
  app.get('/api/project/id/:projectId', projectController.getProject);
  app.get('/api/project/getAll', projectController.getAllProjects);
  app.get('/api/project/user/:id', projectController.getUserProjects);
  app.put('/api/project/edit/:projectId', middleware.authCheck, projectController.editProject);
  app.delete('/api/project/delete/:projectId', middleware.authCheck, projectController.deleteProject);

  //Project Images
  app.post('/api/project/upload/:projectId', middleware.authCheck, middleware.uploadProjectPicture.any(), projectController.uploadProjectImage);
  app.put('/api/project/thumbnail/:projectId', middleware.authCheck, projectController.updateProjectThumbnail);
  app.delete('/api/project/image/:imageId', middleware.authCheck, projectController.deleteProjectImage);


  //Comment Routes
  app.post('/api/comment/create/:projectId', middleware.authCheck, commentController.addCommentToProject);
  app.delete('/api/comment/delete/:commentId', middleware.authCheck, commentController.removeComment);
  app.get('/api/comment/:projectId', commentController.getCommentByProjectId);

  //Like routes
  app.post('/api/like/project/:projectId', middleware.authCheck, likeController.likeProject);
  //Once Auth will get GET
  app.get('/api/like/user/:projectId', middleware.authCheck, likeController.doesUserLike)
};
