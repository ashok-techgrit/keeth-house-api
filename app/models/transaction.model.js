module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transaction", {
    id: {
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      type: Sequelize.UUID,
    },
    userId: {
      type: Sequelize.STRING
    },
    propertyId: {
      type: Sequelize.STRING
    },
    bookingId: {
      type: Sequelize.STRING
    },
    checkIn: {
      type: Sequelize.STRING
    },
    checkOut: {
      type: Sequelize.STRING
    },
    noOfDays: {
      type: Sequelize.STRING
    },
    noOfGuests: {
      type: Sequelize.STRING
    },
    providerOrderId: {
      type: Sequelize.STRING,
    },
    providerPaymentId: {
      type: Sequelize.STRING,
    },
    amount: {
      type: Sequelize.STRING
    },
    gst : {
      type: Sequelize.STRING
    },
    providerCharges : {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    response: {
      type: Sequelize.JSON,
    }
  });

  return Transaction;
};