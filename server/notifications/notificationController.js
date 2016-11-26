const Profile = require('../profiles/profileSchema.js');
const Notification = require('./notificationSchema.js');
const TeamUser = require('../profiles/teamUserSchema.js');

module.exports = {
  inviteMember: (req, res, next) => {
    const receiver = req.userId;
    const team = req.params.teamId;
    Profile.findOne({where: {id: team}})
      .then((user) => {
        Notification.create({type: 'TeamInvite', ReceiverId: receiver})
          .then((notif) => {
            notif.setSender(user)
              .then((notif) => {
                res.json(notif);
              })
              .catch((err) => {
                res.sendStatus(404);
              }) 
          })
      })
  },

  //get all notification by userId

  //promote member notification

  //demote member notification
};
