const userController = require('../users/userController.js');
const projectController = require('../projects/projectController.js');
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
  app.post('/api/project/create', projectController.createProject);
};