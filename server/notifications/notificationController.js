const Profile = require('../profiles/profileSchema.js');
const Notification = require('./notificationSchema.js');

module.exports = {
  inviteMember: (req, res, next) => {
    const sender = req.body.id;
    const receiver = Number(req.params.userId);
    Notification.create({type: 'TeamInvite'})
      .then((notif) => {
        Profile.findOne({where: {id: sender}})
          .then((user) => {
            notif.setSender(user)
              .then((notif) => {
                Profile.findOne({where: {id: receiver}})
                  .then((user) => {
                    notif.setReceiver(user)
                      .then((notif) => {
                        res.json(notif);
                      })
                      .catch((err) => {
                        res.sendStatus(404);
                      })
                  })
              })
          })
      })
  }
};
