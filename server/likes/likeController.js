const Profile = require('../profiles/profileSchema.js');
const Project = require('../projects/projectSchema.js');
const Like = require('./likeSchema.js');

module.exports = {
  likeProject: (req, res, next) => {
    const name = req.body.username; 
    const id = req.params.projectId;
    Project.findById(id)
      .then((project) => {
        Profile.find({where: {username: name}})
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
  }
};

//Working
  // likeProject: (req, res, next) => {
  //   const name = req.body.username; 
  //   const id = req.params.projectId;
  //   Project.findById(id)
  //     .then((project) => {
  //       Profile.find({where: {username: name}})
  //         .then((user) => {
  //           Like.find({where: {ProjectId: project.id, ProfileId: user.id}})
  //             .then((like) => {
  //               Like.destroy({where: {id: like.id}})
  //                 .then(() => {
  //                   res.sendStatus(200);
  //                 })
  //             })
  //             .catch((err) => {
  //               Like.create({})
  //                 .then((like) => {
  //                   user.addLike(like);
  //                   project.addLike(like);
  //                   res.sendStatus(201);
  //                 });
  //             });   
  //         })
  //         .catch((err) => {
  //           res.sendStatus(403);
  //         });
  //     });
  // }

//original
// likeProject: (req, res, next) => {
//     const name = req.body.username; 
//     const id = req.params.projectId;
//     Project.findById(id)
//       .then((project) => {
//         Profile.find({where: {username: name}})
//           .then((user) => {
//             Like.find({where: {ProjectId: project.id, ProfileId: user.id}})
//               .then((like) => {
//                 Like.destroy({where: {id: like.id}})
//                   .then(() => {
//                     res.sendStatus(200);
//                   })
//               })
//               .catch((err) => {
//                 Like.create({})
//                   .then((like) => {
//                       Profile.findOne({where: {username: name}})
//                         .then((user) => {
//                           Project.findById(id)
//                             .then((project) => {
//                               user.addLike(like);
//                               project.addLike(like);
//                               res.sendStatus(201);
//                             })
//                             .catch((err) => {
//                               res.sendStatus(404);
//                             });
//                         })
//                         .catch(() => {
//                           res.sendStatus(404);
//                         });      
//                   });
//               });
//         });
//     });
//   }