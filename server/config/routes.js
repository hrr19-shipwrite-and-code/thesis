var userController = require('../users/userController.js');


module.exports = function (app, express) {

  //Signup/Login --Needs Authentication
  app.post('/api/user/create', userController.createUser);
  //Others to view profiles
  app.get('/api/user/:username', userController.getUser);
  //Edit user profile --Needs authentication
  app.put('/api/user/editBasicInfo', userController.editBasicInfo);


};