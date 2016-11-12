const User = require('../users/userSchema.js');
const Team = require('./teamSchema.js');
const db = require('../db.js');

module.exports = {

  createTeam: (req, res, next) => {
    const teamname = req.body.teamname;
    const username = req.body.username;
    User.findOne({where: {username: username}})
      .then((user) => {
        user.createTeam({teamname: teamname})
          .then(() => {
            res.sendStatus(200);
          });
      });
  },

  addUserToTeam: (req, res, next) => {

  }

};