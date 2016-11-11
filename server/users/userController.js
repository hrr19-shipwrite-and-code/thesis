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
  }
}