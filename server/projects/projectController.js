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
    }
  }

};


    // post: function (req, res) {
    //   db.User.findOrCreate({where: {username: req.body.username}})
    //     // findOrCreate returns multiple resutls in an array
    //     // use spread to assign the array to function arguments
    //     .spread(function(user, created) {
    //       db.Message.create({
    //         userid: user.get('id'),
    //         text: req.body.message,
    //         roomname: req.body.roomname
    //       }).then(function(message) {
    //         res.sendStatus(201);
    //       });
    //     });
    // }

    // Message.belongsTo(User);
    // User.hasMany(Message);


// jan.addProject(homework, { started: false }) // The homework project is not started yet
// jan.setProjects([makedinner, doshopping], { started: true}) // Both shopping and dinner have been started