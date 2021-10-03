module.exports = (sequelize, Sequelize, Car) => {
  const CarHistory = sequelize.define("CarHistory", { 
  start: {
    type: Sequelize.STRING,
    allowNull: false
  },
  end: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startTime: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: false
  },
  distance: {
  type: Sequelize.DOUBLE,
  allowNull: false
},

  car_id: {
    type: Sequelize.INTEGER,

    references: {
      // This is a reference to another model
      model: Car,

      // This is the column name of the referenced model
      key: 'id',
    }
  }
});
return CarHistory;
}