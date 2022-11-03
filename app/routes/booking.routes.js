module.exports = (app) => {
  const booking = require("../controllers/booking.controller.js");

  var router = require("express").Router();

  // Create Order
  router.post("/createOrder", booking.createOrder);

  // Update Transaction
  router.post("/transactionUpdate", booking.transactionUpdate);

  // Get Booking Dates
  router.get("/getBookingDates", booking.getBookingDates);

  // Get Booking Details
  router.get("/getBookingDetails", booking.getBookingDetails);

  app.use("/api/booking", router);
};
