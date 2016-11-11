const User = require('../users/userSchema.js');
const Project = require('./projectSchema.js');
const db = require('../db.js');

module.exports = {

  createProject: (req, res, next) => {
    const user = req.body.username;
    Project.create({title: req.body.title})
      .then((project) => {
        User.findOne({where: {username: user}})
          .then((user) => {
            user.createProject(project, {through: {model: db.UserProject}})
              .then(() => {
                res.sendStatus(200);
              });
          });
      });
  }

};

// jan.addProject(homework, { started: false }) // The homework project is not started yet
// jan.setProjects([makedinner, doshopping], { started: true}) // Both shopping and dinner have been started