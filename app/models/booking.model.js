module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define("booking", {
    id: {
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      type: Sequelize.UUID,
    },
    propertyId: {
      type: Sequelize.STRING
    },
    transactionId: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.STRING,
    },
    adult: {
      type: Sequelize.STRING
    },
    child: {
      type: Sequelize.STRING
    },
  });

  return Booking;
};