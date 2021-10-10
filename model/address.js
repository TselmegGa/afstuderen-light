module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define("Address", {
    streetName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    houseNumber: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    },
    zipCode: {
      type: Sequelize.STRING,
      allowNull: false
    },

});
return Address;
}
