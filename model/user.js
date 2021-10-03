module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
  name: {
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
  licence: {
    type: Sequelize.BOOLEAN,
    allowNull: false, 
    defaultValue: true
  },
  address: {
    type: Sequelize.STRING
  }
});
return User;
}
