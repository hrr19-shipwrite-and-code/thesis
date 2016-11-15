const Profile = require('../profiles/profileSchema.js');
const Project = require('../projects/projectSchema.js');
const Comment = require('./commentSchema.js');

module.exports = {
  addCommentToProject: (req, res, next) => {
    const projectId = req.params.projectId;
    const authId = req.sub.id;
    const comment = req.body.comment;
    Comment.create({comment: comment})
      .then((comment) => {
        Project.findOne({where: {id: projectId}})
          .then((project) => {
            project.addComment(comment)
              .then(() => {
                Profile.findOne({where: {authId: authId}})
                  .then((profile) => {
                    profile.addComment(comment)
                      .then(() => {
                        res.sendStatus(201)
                      })
                        .catch((err) => {
                          res.sendStatus(404);
                        });
                  });
              });
          })
          .catch((err) => {
            res.sendStatus(401);
          });
      });
  },

  removeComment: (req, res, next) => {
    //Needs auth check
    const authId = req.sub.id;
    const id = req.params.commentId;
    Comment.findById(id)
      .then((comment) => {
        Profile.findOne({where: { authId: authId}})
          .then((user) => {
            user = user.toJSON()
            comment = comment.toJSON();
            if (user.id === comment.ProfileId) {
              Comment.destroy({where: {id: id}})
                .then(() => {
                  res.sendStatus(200);
                })
                .catch(() => {
                  res.sendStatus(404);
                });
            } else {
              res.sendStats(401);
            }
          })
          .catch((err) => {
            res.sendStatus(404);
          });
      })
      .catch((err) => {
        res.sendStatus(404);
      })
  }
};