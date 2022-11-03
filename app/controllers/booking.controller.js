const db = require("../models");
const Transaction = db.transaction;
const User = db.user;
const Property = db.property;
const Op = db.Sequelize.Op;

const Razorpay = require("razorpay");
const uuid = require("uuid");
const { JSON } = require("sequelize");
const nodemailer = require("nodemailer");

let rzp = new Razorpay({
  key_id: "rzp_test_68JSxhPXpPF1TP",
  key_secret: "oQjX7EN6LJI3ttJ0jMpCNiLx",
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ashok.kota251@gmail.com",
    pass: "cwpamerhnohfzjnh",
  },
});

// Create booking order
exports.createOrder = async (req, res) => {
  console.log(req.body);
  // Validate request
  if (!req.body.propertyId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  var user = await User.findOne({
    where: { email: req.body.email },
  });

  console.log('User', user);
  if (user == null) {
    var userRequest = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
    };
    user = await User.create(userRequest);
  }


  var propertyInfo = await Property.findByPk(req.body.propertyId);
  const bookingId = uuid.v1();
  const totalPrice = propertyInfo.price * req.body.noOfDays;
  const providerCharges = (totalPrice * 2) / 100;
  const gst = (providerCharges * 12) / 100;

  var amount = Number(totalPrice) + Number(gst) + Number(providerCharges);
  var orderRequest = {
    amount: amount * 100,
    currency: "INR",
    receipt: bookingId,
  };
  rzp.orders
    .create(orderRequest)
    .then(async (data) => {
      var transactionRequest = {
        userId: user.id,
        propertyId: req.body.propertyId,
        bookingId: bookingId,
        providerOrderId: data.id,
        amount: totalPrice,
        gst: gst,
        providerCharges: providerCharges,
        status: data.status,
        checkIn: req.body.startDate,
        checkOut: req.body.endDate,
        noOfDays: req.body.noOfDays,
        noOfGuests: req.body.noOfGuests,
      };
      var res1 = await Transaction.create(transactionRequest);
      console.log(res1);
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error,
      });
    });
};

// Update Booking transaction
exports.transactionUpdate = async (req, res) => {
  // Validate request
  if (!req.body.paymentId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  var transaction = await Transaction.findOne({
    where: { bookingId: req.body.receipt },
  });

  var updateRequest = {
    status: req.body.status,
    providerPaymentId: req.body.paymentId,
  };

  var updateResponse = Transaction.update(updateRequest, {
    where: { id: transaction.id },
  });

  var userResponse = await User.findByPk(transaction.userId)

  // const mailConfigurations = {
  //   from: "ashok.kota251@gmail.com",
  //   to: userResponse.email,
  //   subject: "Booking Confirmation - " + transaction.bookingId,
  //   text: `Hi! ${userResponse.firstName}, Your Booking is confirmed`,
  // };

  // transporter.sendMail(mailConfigurations, function (error, info) {
  //   if (error) throw Error(error);
  //   console.log("Email Sent Successfully");
  // });

  console.log(transaction);

  res.send(transaction);
};

// get Booking Dates by property Id
exports.getBookingDates = async (req, res) => {
  // Validate request
  if (!req.query.propertyId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  var transaction = await Transaction.findAll({
    where: { propertyId: req.query.propertyId },
  });

  res.send(transaction);
};

// get Booking Dates by property Id
exports.getBookingDetails = async (req, res) => {
  // Validate request
  if (!req.query.bookingId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  var transaction = await Transaction.findByPk(req.query.bookingId);
  var userResponse = await User.findByPk(transaction.userId);
  var propertyInfo = await Property.findByPk(transaction.propertyId);


  res.send({transaction, userResponse, propertyInfo});
};





