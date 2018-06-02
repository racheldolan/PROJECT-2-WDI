const Picture = require('../models/picture.js');

function indexRoute(req, res){
  Picture
    .find()
    .exec()
    .then( pictures => {
      res.render('pictures/index', {pictures});
    });
}

function showRoute(req, res) {
  Picture
    .findById(req.params.id)
    .exec()
    .then( pictures => {
      res.render('pictures/index', {pictures});
    });
}

function newRoute(req, res) {
  // if(!res.locals.isLoggedIn)

  res.render('pictures/new');
  // res.redirect('/');
}

function createRoute(req, res) {
  // const pictureData = req.body;
  // pictureData['creator'] = res.locals.user.id;
  Picture
    .create(req.body)
    .then( picture => {
      return res.redirect(`/pictures/${picture.id}`);
    });
}

function editRoute(req, res) {
  Picture
    .findById(req.params.id)
    .exec()
    .then( picture => {
      res.render('pictures/edit', {picture});
    });
}

function updateRoute(req, res) {
  Picture
    .findById(req.params.id)
    .exec()
    .then( picture => {
      Object.assign(picture, req.body);
      picture.save();
    });
  return res.redirect(`/pictures/${req.params.id}`);
}

function deleteRoute(req, res){
  Picture
    .findById(req.params.id)
    .then( picture => {
      picture.remove();
      return res.redirect('/pictures');
    });
}



module.exports = {
  index: indexRoute,
  show: showRoute,
  new: newRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
  // createComment: createCommentRoute
};
