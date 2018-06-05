const User = require('../models/user');
const Picture = require('../models/picture');

function indexRoute(req, res){
  Promise.all([User.findById(req.params.id), Picture.find()])
    .then( values => {
      res.render('users/pictures', {
        values
      });
    });
}

function showRoute(req, res){
  Promise.all([User.findById(req.params.id), Picture.find()])
    .then((values) => {
      checkMatch(values);
      res.render('users/show', {values});
    });
  // User
  // .findById(req.params.id)
  // // .populate('post')
  // .exec()
  // .then( user => {
  //   res.render('users/show', {user});
  // });
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

function checkMatch(array){
  for(let i = 1; i < array.length; i++){
    if(array[0]._id === array[i].creator) {
      return array[i].creator;
    }
  }
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
  index: indexRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute
  // delete: deleteRoute
};
