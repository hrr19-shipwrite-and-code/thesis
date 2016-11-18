const multer = require('multer');
const jwt = require('express-jwt');
const auth = require('../../secret/auth.js');

module.exports = {
  
  uploadProjectPicture: multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        let dest = req.params.projectId;
        cb(null, './client/uploads/' + dest);
      },
      filename: (req, file, cb) => {
        let ext = 'projectPhoto-' + Date.now();
        cb(null, ext);
      }
    })
  }),

  uploadProfilePicture: multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './client/uploads/profile');
      },
      filename: (req, file, cb) => {
        let ext = req.user.sub;
        cb(null, ext);
      }
    })
  }),

authCheck: jwt({
  secret: new Buffer(auth.clientSecret, 'base64'),
  audience: auth.clientId
})

};