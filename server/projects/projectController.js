const User = require('../users/userSchema.js');
const Project = require('./projectSchema.js');
const db = require('../db.js');

module.exports = {

  createProject: (req, res, next) => {
    const name = req.body.name;
    const type = req.params.type;
    if (type === 'user') {
      User.findOne({where: {username: name}})
        .then((user) => {
          user.createProject({title: req.body.title})
            .then(() => {
              res.sendStatus(200);
            });
        });
    } else if (type === 'team') {
      Team.findOne({where: {teamname: name}})
        .then((team) => {
          team.createProject({title: req.body.title})
            .then(() => {
              res.sendStatus(200);
            });
        });
    } else {
      res.sendStatus(400);
    }
  }

};