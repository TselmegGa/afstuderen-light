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

db.parseJwt = function(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(Buffer.from(base64, 'base64').toString());
}
db.address = require("./address")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);
db.car = require("./car")(sequelize, Sequelize);
db.car_history = require("./car.history")(sequelize, Sequelize);
db.user_history = require("./user.history")(sequelize, Sequelize);

db.car.hasMany(db.car_history);
db.car_history.belongsTo(db.car);
db.address.hasOne(db.user);
db.user.belongsTo(db.address);
db.car.hasOne(db.user);
db.user.belongsTo(db.car);
db.user.hasMany(db.user_history);
db.user_history.belongsTo(db.user);



module.exports = db;