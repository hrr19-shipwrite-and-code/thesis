const Profile = require('../profiles/profileSchema.js');
const Notification = require('./notificationSchema.js');

module.exports = {
  inviteMember: (req, res, next) => {
    const sender = req.body.id;
    const receiver = req.params.userId;
    Notification.create({type: 'invite'})
      .then((notif) => {
        Profile.findOne({where: {id: sender}})
          .then((send) => {
              notif.addsender(send)
                .then((note) => {
                  Profile.findOne({where: {id: receiver}})
                    .then((recev) => {
                      notif.addreceiver(recev);
                      })
                    .catch((err) => {
                          console.log(err);
                          res.send(404);
                    });
              });
          });
      });
  }
};

  //   Profile.findOne({where: {id: sender}})
  //     .then((send) => {
  //       Profile.findOne({where: {id: receiver}})
  //         .then((recev) => {
  //           send.setReceiver(recev, {type: 'invite', view: false})
  //             .then((notif) => {
  //               res.send(200);
  //                 })
  //             .catch((err) => {
  //               console.log(err);
  //               res.send(404);
  //             });
  //         });
  //     });
  // }
