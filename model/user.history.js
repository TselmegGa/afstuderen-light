module.exports = (sequelize, Sequelize, User, Car) => {
  const UserHistory = sequelize.define("UserHistory", {
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
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
  user_id: {
    type: Sequelize.INTEGER,

    references: {
      // This is a reference to another model
      model: User,

      // This is the column name of the referenced model
      key: 'id',
    }
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
return UserHistory;
 }
