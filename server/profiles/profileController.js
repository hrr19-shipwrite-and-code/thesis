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
            res.send(profile);
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

  getAllUser: (req, res, next) => {
    let filter = {
      where: {
        type: {
          $eq: 'Member'
        },
        $and: []
      },
      include: [{
        model: Tech,
        attributes: ['id', 'name']
      },
      {
        model: Project,
        attributes: ['id', 'thumbnail']
      }
      ]
    };

    //filters
    req.body.name ? filter.where.name = {$like: '%' + req.body.name + '%'} : false;
    req.body.hire === true ? filter.where.hire = {$eq: true} : false;
    req.body.tech ? filter.where.$and.push(['EXISTS( SELECT * FROM ProfileTeches LEFT JOIN Teches on ProfileTeches.TechId=Teches.id WHERE name IN (?) AND ProfileId = Profile.id)', req.body.tech]) : false;
    if(req.body.location){
      let location = req.body.location.forEach((value) => {
        filter.where.$and.push({location: {$like: '%' + value + '%'}});
      });
    }

    Profile.findAll(filter)
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
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
        res.json(user);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  },

  createTeam: (req, res, next) => {
    console.log(req.body)
    const user = req.body.user;
    const team = req.body.team;
    const teamInfo = {
      name: req.body.name,
      url: team,
      email: req.body.email,
      type: 'Team'
    }
    Profile.findOne({where: {url: user}})
      .then((user) => {
        user.createTeam(teamInfo, {type: 'Owner'})
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
        res.sendStatus(200);
      })
      .catch(() => {
        res.sendStatus(404);
      })
  },

  addMember: (req, res, next) => {
    const sender = req.body.id;
    const receiver = req.params.userId;
    const team = req.params.teamId;

    //check if sender is authorized to add member
    Profile.findOne({
      where: {
        id: team,
        $and: [['EXISTS(SELECT * FROM TeamUsers LEFT JOIN Profiles on TeamUsers.userId=Profiles.id WHERE userId = ? AND TeamUsers.type IN ("Owner", "Admin"))', sender]]
      }
    })
      .then((team) => {
        if(team){
          //check if the receiver is already on the team
          team.getMember({where: {id: receiver}})
            .then((member) => {
              if(member.length === 0){
                team.addMember(receiver, {type: 'Pending'})
                  .then(() => {
                    next();
                  })  
              } else {
                res.sendStatus(400);
              } 
            })  
        } else {
          res.sendStatus(401);
        }
      })
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
        res.sendStatus(400);
      })
  },

  demoteMember: (req, res, next) => {

  },

  addPicture: (req, res, next) => {
    const authId = req.user.sub
    const URL = '/client/uploads/profile/' + authId;
    Profile.findOne({where: {authId: authId}})
      .then((profile) => {
        profile.update({ picture: URL})
          .then((update) => {
            res.send(update);
          });
      });
  }
};