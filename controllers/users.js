const User = require('../models/user');
const Picture = require('../models/picture');

function showRoute(req, res){
  Promise.all([User.findById(req.params.id), Picture.find()])
    .then( (values) => {
      const profile = values[0];
      const pictures = values[1].filter(picture => picture.creator.toString() === profile.id);
      res.render('users/show', {profile, pictures});
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
