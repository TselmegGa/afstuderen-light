module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  privacy: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
     defaultValue: true
  },
  role: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  licence: {
    type: Sequelize.BOOLEAN,
    allowNull: false, 
    defaultValue: true
  }
});
return User;
}
