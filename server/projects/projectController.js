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
    const find = req.team ? {where: {id: req.params.teamId}}: {where: {authId: req.user.sub}}
    Profile.findOne(find)
      .then((user) => {
        user.createProject({
          title: req.body.title,
          description: req.body.description,
          github: req.body.github,
          deploy: req.body.deploy,
          progress: req.body.status,
          contribute: req.body.openSourse,
          thumbnail: '/client/app/assets/thumbnail.png'
          })
          .then((project) => {
            mkdirp('./client/uploads/' + project.id, (err) => {
              if (err) console.log(err);
              res.json({id: project.id});
            });
          });
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(404);
      });
  },

  deleteProject: (req, res, next) => {
    const id = req.params.projectId;
    const find = req.team ? {where: {id: req.params.teamId}}: {where: {authId: req.user.sub}}
    fse.remove('client/uploads/' + id, (err) => {
      if (err) res.sendStatus(404);
      Profile.findOne(find)
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
    const find = req.team ? {where: {id: req.params.teamId}}: {where: {authId: req.user.sub}}
    console.log(id);
    Profile.findOne(find)
      .then((user) => {
        Project.update(req.body, {where: {id: id, ProfileId:user.id}})
          .then(() => {
            res.sendStatus(200);
          })
          .catch((err) => {
            console.log(err);
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
        {
          model: Profile, 
          attributes: ['name', 'url', 'authId', 'id'],
          include: {
            model: Profile,
            as: 'Member',
            through: {attributes: ['type']},
            attributes: ['id', 'name', 'url']
          }
        },
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
    Profile.find({where: {authId: req.user.sub}})
      .then((profile) =>{
        const URL = 'client/uploads/' + id + '/' + req.files[0].filename;
        //console.log(profile)
        Project.find({where: {id: id, ProfileId: profile.id}})
          .then((project) => {
            project.createImage({ url: URL})
              .then((image) => {
                project = JSON.parse(JSON.stringify(project));
                if (project.thumbnail === '/client/app/assets/thumbnail.png') {
                  Project.update({thumbnail: URL}, {where: {id: id}})
                    .then(() => {
                        res.send(image);
                    });
                }
                res.send(image);
              });
          });
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  },

  uploadTeamProjectImage: (req, res, next) => {
    const id = req.params.projectId;
    Profile.find({where: {id: req.params.teamId}})
      .then((profile) =>{
        const URL = 'client/uploads/' + id + '/' + req.files[0].filename;
        //console.log(profile)
        Project.find({where: {id: id, ProfileId: profile.id}})
          .then((project) => {
            project.createImage({ url: URL})
              .then((image) => {
                project = JSON.parse(JSON.stringify(project));
                if (project.thumbnail === '/client/app/assets/thumbnail.png') {
                  Project.update({thumbnail: URL}, {where: {id: id}})
                    .then(() => {
                        res.send(image);
                    });
                }
                res.send(image);
              });
          });
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  },

  updateProjectThumbnail: (req, res, next) => {
    const thumb = req.body.url;
    const id = req.params.projectId;
    const userId = req.user.sub;
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
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  },

  updateTeamProjectThumbnail: (req, res, next) => {
    const thumb = req.body.url;
    const id = req.params.projectId;
    Project.find({where: {id: id}, include: [{model: Profile, attributes: ['id']}]})
      .then((project) => {
        if (req.team.id === project.Profile.id) {
          Project.update({thumbnail: thumb}, {where: {id: id}})
            .then(() => {
              res.sendStatus(200);
            })
            .catch((err) => {
              res.sendStatus(404);
            });
        }
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  },

  deleteProjectImage: (req, res, next ) => {
    const id = req.params.imageId;
    const projectId = req.params.projectId;
    const userId = req.user.sub;
    Project.find({where: {id: projectId}, include: [{model: Profile, attributes: ['authId']}]})
      .then((project) => {
        if (project.Profile.authId === userId) {
          Image.findById(id)
            .then((image) => {
              let url = image.url;
              fse.remove(url, () => {
                if (project.thumbnail === url) {
                  Project.update({thumbnail: '/client/app/assets/thumbnail.png'}, {where: {id: projectId}})
                    .then((proj) => {                                 
                      Image.destroy({where: {id: id}})
                        .then(() => {
                          res.sendStatus(200);
                          })
                        .catch(() => {
                          res.sendStatus(404);
                        });
                    })
                    .catch((err) => {
                      res.sendStatus(404);
                    });
                } else {
                  Image.destroy({where: {id: id}})
                    .then(() => {
                      res.sendStatus(200);
                      })
                    .catch(() => {
                      res.sendStatus(404);
                    });
                }
              });
            })
            .catch((err) => {
            res.sendStatus(404);
            });
        }
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  },

  deleteTeamProjectImage: (req, res, next ) => {
    const id = req.params.imageId;
    const projectId = req.params.projectId;
    Project.find({where: {id: projectId}, include: [{model: Profile, attributes: ['id']}]})
      .then((project) => {
        if (req.team.id === project.Profile.id) {
          Image.findById(id)
            .then((image) => {
              let url = image.url;
              fse.remove(url, () => {
                if (project.thumbnail === url) {
                  Project.update({thumbnail: '/client/app/assets/thumbnail.png'}, {where: {id: projectId}})
                    .then((proj) => {                                 
                      Image.destroy({where: {id: id}})
                        .then(() => {
                          res.sendStatus(200);
                          })
                        .catch(() => {
                          res.sendStatus(404);
                        });
                    })
                    .catch((err) => {
                      res.sendStatus(404);
                    });
                } else {
                  Image.destroy({where: {id: id}})
                    .then(() => {
                      res.sendStatus(200);
                      })
                    .catch(() => {
                      res.sendStatus(404);
                    });
                }
              });
            })
            .catch((err) => {
            res.sendStatus(404);
            });
        }
      })
      .catch((err) => {
        res.sendStatus(404);
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
    let filter = {
      include: [
        {model: Profile, attributes: ['name', 'url', 'picture']},
        {model: Like},
        {model: Comment},
        {model: Tech}
      ],
      where: {id: {$notIn: ['']}},
      offset: req.body.offset || 0,
      limit: 12,
      distinct: true
    }

    //filter
    req.body.tech ? filter.include[3].where = {name: {$in: req.body.tech}} : false;
    req.body.title ? filter.where.title = {$like: '%' + req.body.title +'%'} : false;
    req.body.user ? filter.include[0].where = {name: {$like: '%' + req.body.user + '%'}} : false;
    req.body.status ? filter.where.progress = {$eq: req.body.status} : false;
    req.body.openSource !== undefined ? filter.where.contribute = {$eq: !!Number(req.body.openSource)} : false;

    //sort
    req.body.sort === 'default' ? filter.where.createdAt = {$gt: new Date(new Date() - 31 * 24 * 60 * 60 * 1000)} : false;
    req.body.sort === 'date' ? filter.order = [['createdAt', 'DESC']] : false;
    req.body.sort === 'views' ? filter.order = [['views', 'DESC']] : false;


    Project.findAndCountAll(filter)
      .then((result) => {
        result = JSON.parse(JSON.stringify(result));
        let projects = result.rows
        for (let project of projects) {
          project.Likes = project.Likes.length;
          project.comments = project.Comments.length;
        }
        res.send(result);
      })
      .catch((err) =>{
        console.log(err)
        res.sendStatus(404);
      });
  },
};