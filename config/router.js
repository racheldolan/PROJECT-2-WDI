const router = require('express').Router();

router.route('/')
  .get(pictures.index);

router.route('/pictures')
  .get(pictures.index)
  .post(pictures.create);

router.route('/pictures/new')
  .get(pictures.new);

router.route('/pictures/:id')
  .get(pictures.show)
  .put(pictures.update)
  .delete(pictures.delete);

router.route('/pictures/:id/edit')
  .get(pictures.edit);


module.exports = router;
