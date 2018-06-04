const User = require('../models/user');

function showRoute(req, res){
  User
    .findById(req.params.id)
    .populate('post')
    .exec()
    .then( user => {
      res.render('users/show', {user});
    });
}

function editRoute(req, res){
  return User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      return res.render('users/edit', {user});
    });
}

function updateRoute(req, res){
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      Object.assign(user, req.body);
      user.save();
    });
  return res.redirect(`/users/${req.params.id}`);
}


// function deleteRoute(req, res){
//   return User
//     .findById(req.params.id)
//     .exec()
//     .then(user => {
//       user.remove();
//       return res.redirect('/');
//     });
// }

module.exports = {
  show: showRoute,
  edit: editRoute,
  update: updateRoute
  // delete: deleteRoute
};
