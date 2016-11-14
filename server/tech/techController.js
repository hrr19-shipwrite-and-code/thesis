const Tech = require('./techSchema.js').Tech;
const ProfileTech = require('./techSchema.js').ProfileTech;
const ProjectTech = require('./techSchema.js').ProjectTech;
const Profile = require('../profiles/profileSchema.js');
const Project = require('../Projects/projectSchema.js');

module.exports = {
  profileAddTech: (req, res, next) => {
    const id = req.body.id;
    const techName = req.body.tech
    Tech.findOrCreate({where: {name: techName}})
      .spread((tech) => {
        Profile.findOne({where: {id: id}})
          .then((profile) => {
            console.log(tech)
            profile.addTech(tech)
              .then(() => {
                res.sendStatus(201);
              })
              .catch((err) => {
                console.log(err)
                res.sendStatus(404);
              });
          });
      });
  },

  projectAddTech: (req, res, next) => {
    const id = req.body.id;
    const techName = req.body.tech
    Tech.findOrCreate({where: {name: techName}})
      .spread((tech) => {
        Project.findOne({where: {id: id}})
          .then((project) => {
            console.log(tech)
            project.addTech(tech)
              .then(() => {
                res.sendStatus(201);
              })
              .catch((err) => {
                console.log(err)
                res.sendStatus(404);
              });
          });
      });
  }
}

