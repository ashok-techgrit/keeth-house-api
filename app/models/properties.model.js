module.exports = (sequelize, Sequelize) => {
  const Property = sequelize.define("property", {
    id: {
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      type: Sequelize.UUID,
    },
    name: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.STRING
    }
  });

  return Property;
};