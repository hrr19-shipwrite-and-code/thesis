const Profile = require('./profileSchema.js');

module.exports = {
  createUser: (req, res, next) => {
    Profile.create(req.body)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(400);
      })
  },

  getProfile: (req, res, next) => {
    const id = req.params.profileId;
    Profile.findOne({ where: {id: id}})
      .then((profile) => {
        res.json(profile);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  editUserInfo: (req, res, next) => {
    //Username needs to be changed to authId
    Profile.update(req.body, {where: {username: req.body.username}})
      .then((user, se) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  },

  createTeam: (req, res, next) => {
    const name = req.body.username;
    const teamInfo = {
      teamname: req.body.teamname,
      owner: name,
      email: req.body.email
    }
    Profile.findOne({where: {username: name}})
      .then((user) => {
        user.createTeam(teamInfo)
          .then(() => {
            res.sendStatus(201);
          })
          .catch((err) => {
            res.sendStatus(404);
          });
      });
  },

  editTeamInfo: (req, res, next) => {
    const name = req.body.teamname;
    Profile.findOne({where: {teamname: name}})
      .then((team) => {
        team.update({email: req.body.email})
          .then(() => {
            res.sendStatus(201);
          })
          .catch((err) => {
            console.log(err)
            res.sendStatus(404);
          })
      })
  },

  deleteTeam: (req, res,next) => {
    const name = req.body.teamname;
    Profile.findOne({where: {teamname: name}})
      .then((team) => {
        team.destroy()
          .then(() => {
            res.sendStatus(200)
          })
          .catch(() => {
            res.sendStatus(404)
          })
      })
  },

  addMember: (req, res, next) => {
    const name = req.body.teamname;
    const username = req.body.username;
    Profile.findOne({where: {username: username}})
      .then((user) => {
        Profile.findOne({where: {teamname: name}})
          .then((team) => {
            team.addMember(user)
              .then(() => {
                res.sendStatus(200);
              })
              .catch((err) => {
                res.sendStatus(400);
              });
          });
      });
  },

  removeMember: (req, res, next) => {
    const name = req.body.teamname;
    const username = req.body.username;
    Profile.findOne({where: {username: username}})
      .then((user) => {
        Profile.findOne({where: {teamname: name}})
          .then((team) => {
            team.removeMember(user)
              .then(() => {
                res.sendStatus(200);
              })
              .catch((err) => {
                res.sendStatus(400);
              });
          })
      })
  }
};