var express = require('express');
var router = express.Router();
var controller = require('../controller/history.controller');

/* GET users listing. */
router.get('/car', function(req, res, next) {
  controller.findAllCarHistory(req, res);
});
router.get('/car/:id', function(req, res, next) {
  controller.findAllCarHistoryById(req, res);
});
router.post('/', function(req, res, next) {
  controller.create(req, res);
});

router.get('/user/:id', function(req, res, next) {
  controller.findUserHistoryById(req, res);
});


module.exports = router;
