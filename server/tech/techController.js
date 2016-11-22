const Tech = require('./techSchema.js').Tech;
const ProfileTech = require('./techSchema.js').ProfileTech;
const ProjectTech = require('./techSchema.js').ProjectTech;
const Profile = require('../profiles/profileSchema.js');
const Project = require('../projects/projectSchema.js');

module.exports = {
  profileAddTech: (req, res, next) => {
    const authId = req.user.sub;
    const techName = req.body.name;
    Tech.findOrCreate({where: {name: techName}})
      .spread((tech) => {
        Profile.findOne({where: {authId: authId}})
          .then((profile) => {
            //console.log(tech);
            profile.addTech(tech)
              .then(() => {
                res.send(tech);
              })
              .catch((err) => {
                console.log(err);
                res.sendStatus(404);
              });
          });
      });
  },

  profileRemoveTech: (req, res, next) => {
    const authId = req.user.sub;
    const techId = req.params.techId;
    Tech.findOne({where: {id: techId}})
      .then((tech) => {
        Profile.findOne({where: {authId: authId}})
          .then((profile) => {
            profile.removeTech(tech)
              .then(() => {
                res.sendStatus(200);
              })
              .catch((err) => {
                res.sendStatus(401);
              })
          })
      })
  },

  projectAddTech: (req, res, next) => {
    const authId = req.user.sub;
    const id = req.body.id;
    const techName = req.body.name;
    Tech.findOrCreate({where: {name: techName}})
      .spread((tech) => {
        Project.findOne({
          where: {id: id},
          include: [{model: Profile, where: {authId: authId}}]
        })
          .then((project) => {
            project.addTech(tech)
              .then(() => {
                res.json(tech);
              })
              .catch((err) => {
                console.log(err)
                res.sendStatus(404);
              });
          });
      });
  },

  projectRemoveTech: (req, res, next) => {
    const authId = req.user.sub;
    const id = req.params.projectId;
    const techId = req.params.techId;
    Tech.findOne({
      where: {id: techId},
      include: [{
        model: Project,
        include: [{model: Profile, where: {authId: authId}}]
      }]
    })
      .then((tech) => {
        Project.findOne({where: {id: id}})
          .then((project) => {
            project.removeTech(tech)
              .then(() => {
                res.sendStatus(200);
              })
              .catch((err) => {
                res.sendStatus(401);
              })
          })
      })
  },

  getAllTech: (req, res, next) => {
    Tech.findAll({attributes: ["id", "name"]})
      .then((tech) => {
        res.json(tech);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  }

  //Search by tech name and keep count of search
}

