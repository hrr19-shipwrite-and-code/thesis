const Profile = require('../profiles/profileSchema.js');
const Project = require('./projectSchema.js');
const Comment = require('../comments/commentSchema');
const Like = require('../likes/likeSchema.js');
const mkdirp = require('mkdirp');
const Image = require('./imageSchema.js');
const Tech = require('../tech/techSchema.js').Tech;
const fs = require('fs');
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

  //Uncomment the auth stuff when access to edit profile
  deleteProject: (req, res, next) => {
    const id = req.params.projectId;
    const user = req.body.userId;
    //const authId = req.user.sub;
    fse.remove('client/uploads/' + id, (err) => {
      console.log(err)
      //Profile.findOne({where: {authId: authId}})
      Profile.findOne({where: {id: user}})
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
        })
    })
  },

  editProject: (req, res, next) => {
    const id = req.params.projectId;
    const authId = req.user.sub;
    console.log(id);
    Profile.findOne({ where: { authId: authId}})
      .then((user) => {
        Project.update({title: req.body.title}, {where: {id: id, ProfileId:user.id}})
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
        {model: Image},
        {model: Comment, attributes:['comment', 'createdAt'],
          include: [
            {model: Profile, attributes: ['name', 'url']}, ]
        },
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

  /******************************************
   * Project Images
   ******************************************/

  uploadProjectImage: (req, res, next) => {
    const id = req.params.projectId;
    const authId = req.user.sub;
    Profile.find({where: {authId: authId}})
      .then((profile) =>{
        const URL = '/uploads/' + id + '/' + req.files[0].filename;
        Project.find({where: {id: id, ProfileId: profile.id}})
          .then((project) => {
            project.createImage({ url: URL})
              .then(() => {
                res.sendStatus(200);
              });
          });
      })
      .catch((err) => {
        res.sendStatus(401);
      });
  },

  //Attatch authentication when can access edit profile
  updateProjectThumbnail: (req, res, next) => {
    const thumb = req.body.url;
    const id = req.params.projectId;
    const userId = req.body.userId
    Project.find({where: {id: id}, include: [{model: Profile, attributes: ['id']}]})
      .then((project) => {
        if (project.Profile.id === userId) {
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
    const id = req.params.projectId;
    Image.findById(id)
      .then((image) => {
        let url = 'client/' + image.url;
        fs.unlink(url, () => {
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
    Project.findAll({where: { ProfileId: id}, include: [Like]})
      .then((projects) => {
        projects = JSON.parse(JSON.stringify(projects));
        for (let project of projects) {
          project.Likes = project.Likes.length;
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
      {model: Like}
      ]})
      .then((projects) => {
        projects = JSON.parse(JSON.stringify(projects));
        for (let project of projects) {
          project.Likes = project.Likes.length;
        }
        res.send(projects);
      })
      .catch((err) =>{
        console.log(err)
        res.sendStatus(404);
      });
  },
};