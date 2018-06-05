const express = require('express');
const router = express.Router();

const picturesController = require('../controllers/pictures');
const registrationsController = require('../controllers/registrations');
const sessionsController = require('../controllers/sessions');
const usersController = require('../controllers/users');

router.get('/', (req, res) => res.render('home', {
  isHomepage: true
}));

router.route('/pictures')
  .get(picturesController.index)
  .post(picturesController.create);

router.route('/pictures/new')
  .get(picturesController.new);

router.route('/pictures/:id')
  .get(picturesController.show)
  .put(picturesController.update)
  .delete(picturesController.delete);

router.route('/pictures/:id/edit')
  .get(picturesController.edit);

router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.route('/logout')
  .get(sessionsController.delete);
//
// router.route('/pictures/:id/comment')
//   .post(picturesController.createComment);

router.route('/users/pictures')
  .get(usersController.index);

router.route('/users/:id')
  .get(usersController.show)
  .put(usersController.update);


router.route('/users/:id/edit')
  .get(usersController.edit);


module.exports = router;
