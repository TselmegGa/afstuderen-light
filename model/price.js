module.exports = (sequelize, Sequelize) => {
  const Price = sequelize.define("Price", {
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
});
return Price;
}