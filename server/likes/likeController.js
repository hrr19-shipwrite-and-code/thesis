const Profile = require('../profiles/profileSchema.js');
const Project = require('../projects/projectSchema.js');
const Like = require('./likeSchema.js');

module.exports = {
  likeProject: (req, res, next) => {
    const authId = req.user.sub; 
    const id = req.params.projectId;
    Project.findById(id)
      .then((project) => {
        Profile.find({where: {authId: authId}})
          .then((user) => {
            Like.find({where: {ProjectId: project.id, ProfileId: user.id}})
              .then((like) => {
                Like.destroy({where: {id: like.id}})
                  .then(() => {
                    res.send({ like: false });
                  })
              })
              .catch((err) => {
                Like.create({})
                  .then((like) => {
                    user.addLike(like);
                    project.addLike(like);
                    res.send({ like: true });
                  });
              });   
          })
          .catch((err) => {
            res.sendStatus(403);
          });
      });
  },

  //Once Auth will get GET
  doesUserLike: (req, res, next) => {
    const authId = req.user.sub;
    const id = req.params.projectId;
    Profile.find({where: {authId: authId},
     include: [{model: Like, where: {ProjectId: id}}] })
      .then((profile) => {
        if (profile.Likes.length > 0) {
          res.send({ like: true} );
        } else {
          res.send({ like: false });
        }
      })
      .catch((err) => {
        res.send({ like: false });
      });
  }
};