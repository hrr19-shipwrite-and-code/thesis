const profileController = require('../profiles/profileController.js');
const projectController = require('../projects/projectController.js');
//const junctionController = require('../junctionController.js');

module.exports = function (app, express) {

  //User Routes

  //Signup/Login --Needs Authentication
  app.post('/api/user/create', profileController.createProfile);
  app.post('/api/team/create', profileController.createTeam);
  app.post('/api/team/addMember', profileController.addMember);
  //Others to view profiles
  app.get('/api/profile/:type/:username', profileController.getProfile);
  //Edit user profile --Needs authentication
  app.put('/api/:type/editBasicInfo', profileController.editBasicInfo);

  //Project Routes

  //Creates project --needs Auth
  app.post('/api/project/create', projectController.createProject);
  app.post('/api/project/upload/:projectId', projectController.uploadProjectImage);
  app.post('/api/project/thumbnail/:projectId', projectController.uploadProjectThumbnail);
  app.get('/api/project/id/:projectId', projectController.getProject);
  app.get('/api/project/getAll', projectController.getAllProjects);
  app.put('/api/project/edit', projectController.editProject);
  app.delete('/api/project/delete', projectController.deleteProject);

};