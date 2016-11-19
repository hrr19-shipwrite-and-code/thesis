const Profile = require('../profiles/profileSchema.js');
const Project = require('./projectSchema.js');
const Comment = require('../comments/commentSchema');
const Like = require('../likes/likeSchema.js');
const mkdirp = require('mkdirp');
const Image = require('./imageSchema.js');
const Tech = require('../tech/techSchema.js').Tech;
const fse = require('fs-extra');

module.exports = {

  /*****************************************
   * Single Project
   *****************************************/

  createProject: (req, res, next) => {
    const authId = req.user.sub;
      Profile.findOne({where: {authId: authId}})
        .then((user) => {
          user.createProject({
            title: req.body.title,
            description: req.body.description,
            github: req.body.github,
            deploy: req.body.deploy,
            progress: req.body.status,
            contribute: req.body.openSourse,
            })
            .then((project) => {
              console.log(project);
              mkdirp('./client/uploads/' + project.id, (err) => {
                if (err) console.log(err);
                res.json({id: project.id});
              });
            });
        })
        .catch((err) => {
          res.sendStatus(404);
        });
  },

  deleteProject: (req, res, next) => {
    const id = req.params.projectId;
    const authId = req.user.sub;
    fse.remove('client/uploads/' + id, (err) => {
      if (err) res.sendStatus(404);
      Profile.findOne({where: {authId: authId}})
        .then((user) => {
          Project.destroy({where: {id: id, ProfileId: user.id}})
            .then(() => {
              res.sendStatus(200);
            })
            .catch(() => {
              res.sendStatus(404);
            });
        })
        .catch((err) => {
          res.sendStatus(401);
        });
    });
  },

  editProject: (req, res, next) => {
    const id = req.params.projectId;
    const authId = req.user.sub;
    console.log(id);
    Profile.findOne({ where: { authId: authId}})
      .then((user) => {
        Project.update(req.body, {where: {id: id, ProfileId:user.id}})
          .then(() => {
            res.sendStatus(200);
          })
          .catch((err) => {
            console.log(err)
            res.sendStatus(404);
          });
      })
      .catch((err) => {
        res.sendStatus(401);
      });
  },

  getProject: (req, res, next) => {
    const id = req.params.projectId;
    Project.findById(id, {
      include: [
        {model: Profile, attributes: ['name', 'url', 'authId']},
        {model: Image, attributes: ['id', 'url']},
        {model: Tech, attributes: ['id', 'name'], through: {attributes: []}}
       ]
    })
      .then((project) => {
        project.increment('views');
        project = project.toJSON();
        project.views += 1;
        Like.count({where: {ProjectId: id}})
          .then((likes) => {
            project.likes = likes;
            Comment.count({where: {ProjectId: id}})
              .then((comments) => {
                project.comments = comments;
                res.send(project);
              })
          });
      })
      .catch((err) =>{
        console.log(err);
        res.sendStatus(404);
      });
  },

  /******************************************
   * Project Images
   ******************************************/

  uploadProjectImage: (req, res, next) => {
    const id = req.params.projectId;
    const authId = req.user.sub;
    Profile.find({where: {authId: authId}})
      .then((profile) =>{
        const URL = 'client/uploads/' + id + '/' + req.files[0].filename;
        Project.find({where: {id: id, ProfileId: profile.id}})
          .then((project) => {
            project.createImage({ url: URL})
              .then((image) => {
                res.send(image);
              });
          });
      })
      .catch((err) => {
        res.sendStatus(401);
      });
  },

  updateProjectThumbnail: (req, res, next) => {
    const thumb = req.body.url;
    const id = req.params.projectId;
    const userId = req.user.sub
    Project.find({where: {id: id}, include: [{model: Profile, attributes: ['authId']}]})
      .then((project) => {
        if (project.Profile.authId === userId) {
          Project.update({thumbnail: thumb}, {where: {id: id}})
            .then(() => {
              res.sendStatus(200);
            })
            .catch((err) => {
              res.sendStatus(404);
            });
        }
      });
  },

  deleteProjectImage: (req, res, next ) => {
    const id = req.params.imageId;
    Image.findById(id)
      .then((image) => {
        let url = image.url;
        fse.remove(url, () => {
          Image.destroy({where: {id: id}})
            .then(() => {
              res.sendStatus(200);
            })
            .catch(() => {
              res.sendStatus(404);
            });
        });
      });
  },

  /******************************************
   * Multiple Projects
   ******************************************/

  getUserProjects: (req, res, next) => {
    const id = req.params.id;
    Project.findAll({where: { ProfileId: id}, include: [Like, Comment]})
      .then((projects) => {
        projects = JSON.parse(JSON.stringify(projects));
        for (let project of projects) {
          project.Likes = project.Likes.length;
          project.comments = project.Comments.length;
        }
        res.send(projects);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  },

  getAllProjects: (req, res, next) => {
    //Adjust offset and limit later this was for testing
    //Also can add different filters, etc.
    Project.findAll({
      include: [
      {model: Profile, attributes: ['name', 'url', 'picture']},
      {model: Like},
      {model: Comment}
      ]})
      .then((projects) => {
        projects = JSON.parse(JSON.stringify(projects));
        for (let project of projects) {
          project.Likes = project.Likes.length;
          project.comments = project.Comments.length
        }
        res.send(projects);
      })
      .catch((err) =>{
        console.log(err)
        res.sendStatus(404);
      });
  },
};