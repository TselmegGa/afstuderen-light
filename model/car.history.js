module.exports = (sequelize, Sequelize) => {
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
}
});
return CarHistory;
}