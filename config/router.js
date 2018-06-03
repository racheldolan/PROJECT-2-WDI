const express = require('express');
const router = express.Router();

const picturesController = require('../controllers/pictures');
const registrationsController = require('../controllers/registrations');
const sessionsController = require('../controllers/sessions');

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


module.exports = router;
