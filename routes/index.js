var express = require('express');
var router = express.Router();
const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('u55777p59727_callacar', 'u55777p59727_callacar', 'SXVNhrVFk', {
  host: 'web0086.zxcs.nl',
  dialect: 'mysql'
});

async function asyncCall() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
/* GET home page. */
router.get('/', function(req, res, next) {
  asyncCall()
  res.render('index', { title: 'Express' });
});

module.exports = router;
