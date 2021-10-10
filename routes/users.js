var express = require('express');
var router = express.Router();
var controller = require('../controller/user.controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  controller.findAll(req, res);
});
router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', function(req, res, next) {
  controller.findOne(req, res);
});
router.put('/:id', function(req, res, next) {
  controller.update(req, res);
});
router.delete('/:id', function(req, res, next) {
  controller.delete(req, res);
});



module.exports = router;
