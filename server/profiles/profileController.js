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
        through: {attributes: ['type']}
      },
      {
        model: Profile,
        as: 'Team',
        attributes: ['id', 'name', 'url'],
        through: {where: {type: {$not: 'Pending'}}}
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
    const authId = req.user.sub;
    const teamInfo = {
      name: req.body.name,
      url: req.body.url,
      email: req.body.email,
      location: req.body.location,
      hire: req.body.hire || false,
      bio: req.body.bio,
      type: 'Team'
    }
    Profile.findOne({where: {authId: authId}})
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
    const teamId = req.params.teamId;
    Profile.update(req.body, {where: {id: teamId}})
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(404);
      })
  },

  deleteTeam: (req, res,next) => {
    const teamId = req.params.teamId;
    const user = req.user.sub;
    Profile.findOne({
      where: {
        authId: user,
        $and: [['EXISTS(SELECT * FROM TeamUsers LEFT JOIN Profiles on TeamUsers.userId=Profiles.id WHERE authId = ? AND TeamUsers.type = "Owner")', user]]
      }
    })
      .then((user) => {
        if(user){
          Profile.destroy({where: {id: teamId}})
            .then((team) => {
              res.json(team);
            })
            .catch((err) => {
              console.log(err)
              res.sendStatus(404);
            })
        } else {
          res.sendStatus(401)
        }
      })     
  },

  memberTypeCheck: (req, res, next) => {
    const sender = req.user.sub;
    const team = req.params.teamId;
    Profile.findOne({
      where: {
        id: team,
        $and: [['EXISTS(SELECT * FROM TeamUsers LEFT JOIN Profiles on TeamUsers.userId=Profiles.id WHERE authId = ? AND TeamUsers.type IN ("Owner", "Admin"))', sender]]
      }
    })
      .then((team) => {
        if(team){
          req.team = team;
          next() 
        } else{
          res.sendStatus(401)
        }
      })
  },

  addMember: (req, res, next) => {
    const receiver = req.params.userURL;
    const team = req.team;
    
    team.getMember({where: {url: receiver, type: 'Member'}})
      .then((member) => {
        if(member.length === 0){
          Profile.findOne({where: {url: receiver, type: 'Member'}})
            .then((memberInfo) => {
              req.userInfo = memberInfo;
              team.addMember(memberInfo.id, {type: 'Pending'})
                .then(() => {
                  next();
                })  
            })
          
        } else {
          res.sendStatus(400);
        } 
      })  
  },

  removeMember: (req, res, next) => {
    const receiver = req.params.userId;
    const team = req.team;
    //check if member can be removed (not owner)
    Profile.findOne({
      where: {
        id: receiver,
        $and: [['EXISTS(SELECT * FROM TeamUsers LEFT JOIN Profiles ON TeamUsers.userId=Profiles.id WHERE userId = ? AND TeamUsers.type IN ("Admin", "Member", "Pending"))', receiver]]
      }
    })
      .then((user) => {
        if(user){
          team.removeMember(user)
          .then(() => {
            res.sendStatus(200);
          })
          .catch((err) => {
            res.sendStatus(400);
          });
        } else {
          res.sendStatus(401);
        }
    })
  },

  leaveTeam: (req, res, next) => {
    const authId = req.user.sub;
    const team = req.params.teamId;

    Profile.findOne({
      where: {
        authId: authId,
        $and: [['EXISTS(SELECT * FROM TeamUsers LEFT JOIN Profiles ON TeamUsers.userId=Profiles.id WHERE authId = ? AND TeamUsers.type IN ("Admin", "Member"))', authId]]
      },
    })
      .then((user) => {
        if(user){
          user.removeTeam(team)
            .then(() => {
              res.sendStatus(200);
            })
            .catch((err) => {
              res.sendStatus(401);
            });
        } else {
          res.sendStatus(400);
        } 
      });
  },

  promoteMember: (req, res, next) => {
    const receiver = req.params.userId;
    const team = req.params.teamId;
    
    TeamUser.update({type: 'Admin'}, {
      where: {teamId: team, userId: receiver, type: {$not: 'Owner'}}
    })
      .then(() => {
        res.sendStatus(200)
      })
      .catch((err) => {
        res.sendStatus(400);
      });
  },

  demoteMember: (req, res, next) => {
    const receiver = req.params.userId;
    const team = req.params.teamId;
    
    TeamUser.update({type: 'Member'}, {
      where: {teamId: team, userId: receiver, type: {$not: 'Owner'}}
    })
      .then(() => {
        res.sendStatus(200)
      })
      .catch((err) => {
        res.sendStatus(400);
      });
  },

  addUserPicture: (req, res, next) => {
    const authId = req.user.sub
    const URL = '/client/uploads/profile/' + authId;
    Profile.findOne({where: {authId: authId}})
      .then((profile) => {
        profile.update({ picture: URL})
          .then((update) => {
            res.send(update);
          });
      });
  },

  addTeamPicture: (req, res, next) => {
    const teamId = req.params.teamId;
    const URL = '/client/uploads/profile/' + teamId;
    Profile.findOne({where: {id: teamId}})
      .then((profile) => {
        profile.update({ picture: URL})
          .then((update) => {
            res.send(update);
          })
      });
  }
};