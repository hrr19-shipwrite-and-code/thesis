const Profile = require('../profiles/profileSchema.js');
const Project = require('./projectSchema.js');
const Comment = require('../comments/commentSchema');
const Like = require('../likes/likeSchema.js');
const multer = require('multer');
const mkdirp = require('mkdirp');
const Image = require('./imageSchema.js');
const Tech = require('../tech/techSchema.js').Tech;
const ProjectTech = require('../tech/techSchema.js').ProjectTech;
const db = require('../db.js');

module.exports = {

  //Projects
  createProject: (req, res, next) => {
    const name = req.body.name;
      Profile.findOne({where: {name: name}})
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
    Project.findById(id, { 
      include: [{model: Profile, attributes: ['name']},
       {model: Image},
       {model: Comment, attributes:['comment', 'createdAt'], include: [{model: Profile, attributes: ['name']}] },
       {model: Tech, attributes: ['name'], through: {attributes: []}}
       ]})
      .then((project) => {
        project.increment('views');
        project = project.toJSON();
        project.views += 1;
        Like.count({where: {ProjectId: id}})
          .then((likes) => {
            project.likes = likes;
            res.send(project);
          });
      })
      .catch((err) =>{ 
        console.log(err);
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
    Project.findAll({ offset: 1, limit: 3, include: [{model: Profile, attributes: ['name']}]})
      .then((projects) => {
        res.json(projects);
      })
      .catch((err) =>{
        res.send(404);
      });
  },

  //Project Images
  uploadProjectImage: (req, res, next) => {
    const id = req.params.projectId;
    mkdirp('./client/uploads/' + id, (err) => {
      if (err) console.log(err)
    });
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
      if (err) console.log(err);
    });
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
        });
    });
  }

};