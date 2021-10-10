module.exports = (sequelize, Sequelize) => {
  const Car = sequelize.define("Car", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  wheelchair: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
     defaultValue: false
  }
});
return Car;
}