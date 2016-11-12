const userController = require('../users/userController.js');
const projectController = require('../projects/projectController.js');
const teamController = require('../teams/teamController.js');
//const junctionController = require('../junctionController.js');

module.exports = function (app, express) {

  //User Routes

  //Signup/Login --Needs Authentication
  app.post('/api/user/create', userController.createUser);
  //Others to view profiles
  app.get('/api/user/:username', userController.getUser);
  //Edit user profile --Needs authentication
  app.put('/api/user/editBasicInfo', userController.editBasicInfo);

  //Project Routes

  //Creates project --needs Auth
  app.post('/api/project/:type/create', projectController.createProject);

  //Team Routes

  //Create Team --need auth
  app.post('/api/team/create', teamController.createTeam);

};