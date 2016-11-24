const Profile = require('../profiles/profileSchema.js');
const Notification = require('./notificationSchema.js');
const TeamUser = require('../profiles/teamUserSchema.js');

module.exports = {
  inviteMember: (req, res, next) => {
    const sender = req.body.id;
    const receiver = req.params.userId;
    const team = req.params.teamId;
    Profile.findOne({
      where: {
        id: team,
        $and: [['EXISTS(SELECT * FROM TeamUsers LEFT JOIN Profiles on TeamUsers.userId=Profiles.id WHERE userId = ? AND TeamUsers.type IN ("Owner", "Admin"))', sender]]
      }
    })
      .then((user) => {
        if(user){
          Notification.create({type: 'TeamInvite', ReceiverId: receiver})
            .then((notif) => {
              Profile.findOne({where: {id: team}})
                .then((team) => {
                  team.getMember({where: {id: receiver}})
                    .then((member) => {
                      console.log(member)
                      if(member.length === 0){
                        team.addMember(receiver, {type: 'Pending'})
                          .then(() => {
                            notif.setSender(user)
                              .then((notif) => {
                                res.json(notif);
                              })
                              .catch((err) => {
                                res.sendStatus(404);
                              })
                          })  
                      } else {
                        res.sendStatus(404);
                      }
                      
                    })
                })    
            })
        } else {
          res.sendStatus(401);
        }
      })
  },
};
