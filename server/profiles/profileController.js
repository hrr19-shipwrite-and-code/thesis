const Profile = require('./profileSchema.js');
const Tech = require('../tech/techSchema.js').Tech;
const Project = require('../projects/projectSchema.js');
const TeamUser = require('./teamUserSchema.js');
const multer = require('multer');

module.exports = {
  createUser: (req, res, next) => {
    const name = req.body.user_metadata ? req.body.user_metadata.name : req.body.name;
    Profile.count()
      .then((count) => {
        const authId = req.user.sub;
        const userInfo = {
          url: req.body.nickname + count,
          name: name,
          authId: authId,
          type: 'member',
          email: req.body.email,
          picture: req.body.picture,
          hire: req.body.hireable || false,
          github: req.body.html_url || null,
          linkedin: req.body.publicProfileUrl || null
        }

        Profile.findOrCreate({where: {authId: authId}, defaults: userInfo})
          .spread((profile) => {
            res.send(profile.url);
          })
          .catch((err) => {
            console.log(err)
            res.sendStatus(400);
          })
      })

  },

  getProfile: (req, res, next) => {
    const url = req.params.profileUrl;

    Profile.findOne({
      where: {url: url},
      include:[{
        model: Tech,
        attributes: ['id', 'name'],
        through: {attributes: []}
      },
      {
        model: Profile,
        as: 'Member',
        attributes: ['id', 'name', 'url'],
        through: {attributes: []}
      },
      {
        model: Profile,
        as: 'Team',
        attributes: ['id', 'name', 'url'],
        through: {attributes: []}
      },
      {
        model: Project
      }]
    })
      .then((profile) => {
        res.json(profile);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  getEditUserInfo: (req, res, next) => {
    const authId = req.user.sub;
    Profile.findOne({where: {authId: authId}})
      .then((user) => {
        res.json(user);
      })
  },

  editUserInfo: (req, res, next) => {
    const authId = req.user.sub;
    Profile.update(req.body, {where: {authId: authId}})
      .then((user) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  },

  createTeam: (req, res, next) => {
    const user = req.body.user;
    const team = req.body.team;
    const teamInfo = {
      name: req.body.name,
      url: team,
      email: req.body.email,
      type: 'team'
    }
    Profile.findOne({where: {url: user}})
      .then((user) => {
        user.createTeam(teamInfo, {admin: true})
          .then(() => {
            res.sendStatus(201);
          })
          .catch((err) => {
            console.log(err)
            res.sendStatus(404);
          });
      });
  },

  editTeamInfo: (req, res, next) => {
    const url = req.body.url;
    Profile.update({email: req.body.email}, {where: {url: url}})
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(404);
      })
  },

  deleteTeam: (req, res,next) => {
    const url = req.body.url;
    Profile.destroy({where: {url: url}})
      .then(() => {
        res.sendStatus(200)
      })
      .catch(() => {
        res.sendStatus(404)
      })
  },

  addMember: (req, res, next) => {
    const team = req.body.team;
    const user = req.body.user;
    Profile.findOne({where: {url: user}})
      .then((user) => {
        Profile.findOne({where: {url: team}})
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
    const team = req.body.team;
    const user = req.body.user;
    Profile.findOne({where: {url: user}})
      .then((user) => {
        Profile.findOne({where: {url: team}})
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
  },

  promoteMember: (req, res, next) => {
    const user = req.body.user;
    const team = req.body.team;
    TeamUser.findOne({where: {userId: user, teamId: team, admin: true}, attributes: ['userId', 'teamId', "admin"]})
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(400)
      })
  },

  demoteMember: (req, res, next) => {

  },

  addPicture: (req, res, next) => {
    const authId = req.user.sub
    const URL = './client/uploads/profile/' + authId;
    Profile.findOne({where: {authId: authId}})
      .then((profile) => {
        profile.update({ picture: URL})
          .then(() => {
            res.sendStatus(200);
          });
      });
  }

  //delete picture function
};