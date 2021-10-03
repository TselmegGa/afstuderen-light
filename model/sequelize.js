const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
//sequelize
var sequelize = new Sequelize('u55777p59727_callacar', 'u55777p59727_callacar', 'SXVNhrVFk', {
  host: 'web0086.zxcs.nl',
  dialect: 'mysql'
});
var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.admin = require("./admin")(sequelize, Sequelize);
db.price = require("./price")(sequelize, Sequelize);
db.car = require("./car")(sequelize, Sequelize, db.price);
db.car_history = require("./car.history")(sequelize, Sequelize, db.car);
db.user_history = require("./user.history")(sequelize, Sequelize, db.user, db.car);



module.exports = db;