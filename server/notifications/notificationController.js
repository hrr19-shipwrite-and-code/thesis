const Profile = require('../profiles/profileSchema.js');
const Notification = require('./notificationSchema.js');
const TeamUser = require('../profiles/teamUserSchema.js');

module.exports = {
  inviteMember: (req, res, next) => {
    const receiver = req.userInfo.id;
    const team = req.params.teamId;
    Profile.findOne({where: {id: team}})
      .then((user) => {
        Notification.create({type: 'TeamInvite', ReceiverId: receiver})
          .then((notif) => {
            notif.setSender(user)
              .then((notif) => {
                res.json(req.userInfo);
              })
              .catch((err) => {
                res.sendStatus(404);
              }) 
          })
      })
  },

  //get all notification by userId
  getAllNotification: (req, res, next) => {
    const authId = req.user.sub;
    Profile.findOne({where: {authId: authId}})
      .then((user) => {
        Notification.findAll({
          where: {ReceiverId: user.id},
          include: [{
            model: Profile,
            as: 'Sender',
            attributes: ['url', 'name']
          }]
        })
          .then((notifications) => {
            res.json(notifications);
          });
      });
  },

  viewNotification: (req, res, next) => {
    const authId = req.user.sub;
    Profile.findOne({where: {authId: authId}})
      .then((user) => {
        Notification.update({viewed: true}, {where: {ReceiverId: user.id}})
          .then(() => {
            res.sendStatus(200);
          });
      });
  },

  deleteNotification: (req, res, next) => {
    const teamId = req.params.teamId
    const userId = req.user.id
    Notification.destroy({where: {SenderId: teamId, ReceiverId: userId}})
      .then(() => {
        res.sendStatus(200);
      })
  }

};
