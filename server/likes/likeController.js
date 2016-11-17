const Profile = require('../profiles/profileSchema.js');
const Project = require('../projects/projectSchema.js');
const Like = require('./likeSchema.js');

module.exports = {
  likeProject: (req, res, next) => {
    const authId = req.sub.id; 
    const id = req.params.projectId;
    Project.findById(id)
      .then((project) => {
        Profile.find({where: {authId: authId}})
          .then((user) => {
            Like.find({where: {ProjectId: project.id, ProfileId: user.id}})
              .then((like) => {
                Like.destroy({where: {id: like.id}})
                  .then(() => {
                    res.sendStatus(200);
                  })
              })
              .catch((err) => {
                Like.create({})
                  .then((like) => {
                    user.addLike(like);
                    project.addLike(like);
                    res.sendStatus(201);
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
    const authId = req.sub.id;
    const id = req.params.projectId;
    Profile.find({where: {authId: authId},
     include: [{model: Like, where: {ProjectId: id}}] })
      .then((profile) => {
        res.json({ like: true} );
      })
      .catch((err) => {
        res.json({ like: false });
      });
  }
};