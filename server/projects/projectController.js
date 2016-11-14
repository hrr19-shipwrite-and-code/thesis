const Profile = require('../profiles/profileSchema.js');
const Project = require('./projectSchema.js');
const multer = require('multer');
const mkdirp = require('mkdirp');
const Image = require('./imageSchema.js');
const Tech = require('../tech/techSchema.js');
const db = require('../db.js');

module.exports = {

  //Projects
  createProject: (req, res, next) => {
    const name = req.body.username;
      Profile.findOne({where: {username: name}})
        .then((user) => {
          user.createProject({title: req.body.title, views: 0})
            .then(() => {
              res.sendStatus(200);
            });
        })
        .catch((err) => {
          res.sendStatus(404);
        });
  },

  getProject: (req, res, next) => {
    const id = req.params.projectId;
    Project.findById(id, { include: [{model: Profile, attributes: ['teamname', 'username']}] })
      .then((project) => {
        project.increment('views');
        project = project.toJSON();
        Image.findAll({where: {ProjectId: id}, attributes: ['url']})
          .then((image) => {
            project.views += 1;
            project.image = image;
            res.send(project);
          });
      })
      .catch((err) =>{ 
        res.sendStatus(404);
      });
  },

  editProject: (req, res, next) => {
    const id = req.body.id;
    Project.update(req.body.update, { where: { id: id }})
      .then(() => {
        res.send(200);
      })
      .catch((err) => {
        res.sendStatus(404);
      })
  },

  deleteProject: (req, res, next) => {
    const id = req.body.id;
    Project.destroy({where: {id: id}})
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  },

  getAllProjects: (req, res, next) => {
    //Adjust offset and limit later this was for testing
    Project.findAll({ offset: 1, limit: 3, include: [{model: Profile, attributes: ['teamname', 'username']}]})
      .then((projects) => {
        res.json(projects);
      })
      .catch((err) =>{
        res.send(404)
      });
  },

  //Project Images
  uploadProjectImage: (req, res, next) => {
    const id = req.params.projectId;
    mkdirp('./client/uploads/' + id, (err) => {
      if (err) console.log(err)
    })
    const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, './client/uploads/' + id);
      },
      filename: function (req, file, callback) {
        callback(null, 'projectPhoto-' + Date.now());
      }
    });
    const upload = multer({storage: storage}).single('projectPhoto');
    upload(req, res, (err) => {
      if (err) res.end('Error Uploading File');
      const URL = '/uploads/' + id + '/' + 'projectPhoto-' + Date.now();
      Project.findById(id)
        .then((project) => {
          project.createImage({ url: URL})
            .then(() => {
              res.sendStatus(200);
            });
        });
    });
  },

  uploadProjectThumbnail: (req, res, next) => {
    const id = req.params.projectId;
    mkdirp('./client/uploads/' + id, (err) => {
      if (err) console.log(err)
    })
    const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, './client/uploads/' + id);
      },
      filename: function (req, file, callback) {
        callback(null, 'thumbnailPhoto-' + Date.now());
      }
    });
    const upload = multer({storage: storage}).single('thumbnailPhoto');
    upload(req, res, (err) => {
      if (err) res.end('Error Uploading File');
      const URL = '/uploads/' + id + '/' + 'thumbnailPhoto-' + Date.now();
      Project.update({ thumbnail: URL }, {where: { id: id }})
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          res.sendStatus(404);
        })
    });
  }

};