const Profile = require('./profileSchema.js');

module.exports = {
  createProfile: (req, res, next) => {
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
    const username = req.params.username;
    Profile.findOne({ where: {username: username}})
      .then((user) => {
        res.json(user);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  editBasicInfo: (req, res, next) => {
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
    Profile.findOne({where: {username: name}})
      .then((user) => {
        user.createTeam({teamname: req.body.teamname})
          .then(() => {
            res.sendStatus(201);
          })
          .catch((err) => {
            res.sendStatus(404);
          });
      });
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
              })
          });
      });
  }
};



// Profile.findOne({where: {username: name}})
//   .then((user) => {
//     user.createProject({title: req.body.title})
//       .then(() => {
//         res.sendStatus(200);
//       });
//   });