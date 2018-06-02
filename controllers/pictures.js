const Picture = require('..models/picture.js');

function indexRoute(req, res){
  Picture
    .find()
    .exec()
    .then( pictures => {
      res.render('pictures/home', {pictures});
    });
}

function showRoute(req, res) {
  Picture
    .findById(req.params.id)
    .exec()
    .then( pictures => {
      res.render('pictures/home', {pictures});
    });
}



module.exports = {
  index: indexRoute,
  show: showRoute,
  new: newRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute
};
