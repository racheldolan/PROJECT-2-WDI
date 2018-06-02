const Picture = require('../models/picture');


function indexRoute(req, res){
  Picture
    .find()
    .exec()
    .then( pictures => {
      res.render('pictures/index', {
        pictures
      });
    });
}

function showRoute(req, res){
  Picture
    .findById(req.params.id)
    .exec()
    .then( picture => {
      res.render('pictures/show', {picture});
    });
}

function newRoute(req, res){
  res.render('pictures/new');
}

function createRoute(req, res){
  Picture
    .create(req.body)
    .then(( picture) => {
      return res.redirect(`/pictures/${picture._id}`);
    });
}

function editRoute(req, res){
  return Picture
    .findById(req.params.id)
    .exec()
    .then((picture) => {
      return res.render('pictures/edit', {picture});
    });
}

function updateRoute(req, res){
  Picture
    .findById(req.params.id)
    .exec()
    .then(picture => {
      Object.assign(picture, req.body);
      picture.save();
    });
  return res.redirect(`/pictures/${req.params.id}`);
}


function deleteRoute(req, res){
  return Picture
    .findById(req.params.id)
    .exec()
    .then(picture => {
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
