const Profile = require('../profiles/profileSchema.js');
const Project = require('../projects/projectSchema.js');
const Comment = require('./commentSchema.js');

module.exports = {
  addCommentToProject: (req, res, next) => {
    const projectId = req.params.projectId;
    const name = req.body.username;
    const comment = req.body.comment;
    Comment.create({comment: comment})
      .then((comment) => {
        Project.findOne({where: {id: projectId}})
          .then((project) => {
            project.addComment(comment)
              .then(() => {
                Profile.findOne({where: {username: name}})
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
            res.sendStatus(404);
          });
      });
  },

  removeComment: (req, res, next) => {
    //Needs auth check
    const name = req.body.username;
    const id = req.params.commentId;
    Comment.findById(id)
      .then((comment) => {
        Profile.findOne({where: { username: name}})
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
              res.sendStats(403)
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