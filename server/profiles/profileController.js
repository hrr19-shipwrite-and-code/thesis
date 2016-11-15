const Profile = require('./profileSchema.js');
const Tech = require('../tech/techSchema.js').Tech;
const Project = require('../projects/projectSchema.js');
const TeamUser = require('./teamUserSchema.js');
const multer = require('multer');

module.exports = {
  createUser: (req, res, next) => {
    const authId = req.user.sub;
    const userInfo = {
      url: req.body.url,
      name: req.body.name,
      authId: authId,
      type: 'member',
      email: req.body.email
    }

    Profile.create(userInfo)
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

    Profile.findOne({
      where: {id: id},
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
    //auth should be checked before upload
    const id = req.body.id;
    const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, './client/uploads/profile');
      },
      filename: function (req, file, callback) {
        callback(null, 'profilePhoto-' + id);
      }
    });
    const upload = multer({storage: storage}).single('profilePhoto');
    upload(req, res, (err) => {
      if (err) res.end('Error Uploading File');
      const URL = '/uploads/profile/profilePhoto-' + id;
      Profile.findById(id)
        .then((profile) => {
          profile.update({ picture: URL})
            .then(() => {
              res.sendStatus(200);
            });
        });
    });
  }

  //delete picture function
};