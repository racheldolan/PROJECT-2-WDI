const Picture = require('../models/picture');


function indexRoute(req, res){
  Picture
    .find()
    .populate('creator')
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
    .populate('creator')
    .populate('comments.userId')
    .exec()
    .then( picture => {
      res.render('pictures/show', {picture});
    });
}

function newRoute(req, res){
  res.render('pictures/new');
}

function createRoute(req, res){
  req.body.creator = res.locals.user.id;
  Picture
    .create(req.body)
    .then(( picture) => {
      return res.redirect(`/pictures/${picture._id}`);
    });
}

function editRoute(req, res){
  Picture
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

function createCommentRoute(req, res, next){
  req.body.userId = req.user._id;
  Picture
    .findById(req.params.id)
    .populate('userId')
    .exec()
    .then(picture => {
      // console.log(req.user._id);
      console.log(req.body);
      picture.comments.push(req.body);
      return picture.save();
    })
    .then(picture => res.redirect(`/pictures/${picture.id}`))
    .catch(next);
}

function commentDeleteRoute(req, res, next) {
  Picture
    .findById(req.params.id)
    .then(picture => {
      const comment = picture.comments.id(req.params.commentId);
      comment.remove();
      return picture.save();
    })
    .then(picture => res.redirect(`/pictures/${picture.id}`))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  new: newRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  commentDelete: commentDeleteRoute
};
