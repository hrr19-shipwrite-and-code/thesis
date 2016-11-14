const Profile = require('../profiles/profileSchema.js');
const Project = require('../projects/projectSchema.js');
const Like = require('./likeSchema.js');

module.exports = {
  likeProject: (req, res, next) => {
    const name = req.body.username; 
    const id = req.params.projectId;
    Profile.findOne({where: {username: name}})
      .then((profile) => {
        Like.findOne({where: {ProfileId: profile.id}})
          .then((like) => {
              Link.destory({where: {id: like.id}})
                .then(() => {
                  res.sendStatus(200);
                })
                .catch((err) => {
                  console.log('remove', err);
                  res.sendStatus(404);
                });
          })
          .catch((err) => {
            profile.setLike({})
              .then(() => {
                res.sendStatus(201);
              })
              .catch((err) => {
                console.log('add', err);
                res.sendStatus(404);
              });
          });
      })
      .catch((err) => {
        console.log('user', err);
        res.sendStatus(403);
      });
  }
}