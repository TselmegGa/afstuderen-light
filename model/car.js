module.exports = (sequelize, Sequelize, Price) => {
  const Car = sequelize.define("Car", {
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  wheelchair: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
     defaultValue: false
  },
  price_id: {
    type: Sequelize.INTEGER,

    references: {
      // This is a reference to another model
      model: Price,

      // This is the column name of the referenced model
      key: 'id',
    }
  }
});
return Car;
}