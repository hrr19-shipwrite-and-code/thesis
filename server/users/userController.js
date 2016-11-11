const User = require('./userSchema.js');


module.exports = {
  createUser: function (req, res, next) {
    User.create(req.body)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(400);
      })
  },

  getUser: function (req, res, next) {
    const username = req.params.username;
    User.findOne({ where: {username: username}})
      .then((user) => {
        res.json(user);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  editBasicInfo: function (req, res, next) {
    //Username needs to be changed to authId
    User.update(req.body, {where: {username: req.body.username}})
      .then((user, se) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.sendStatus(404);
      })
  }
}