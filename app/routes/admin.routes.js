module.exports = app => {
  const adminUsers = require("../controllers/admin.controller.js");

  var router = require("express").Router();

  // Create a new Admin User
  router.post("/", adminUsers.create);

  // Retrieve all Admin Users
  router.get("/", adminUsers.findAll);

  // Retrieve a single Admin User with id
  router.get("/:id", adminUsers.findOne);

  // Update a Admin User with id
  router.put("/:id", adminUsers.update);

  // Delete a Admin User with id
  router.delete("/:id", adminUsers.delete);

  // Create a new Admin User
  router.delete("/", adminUsers.deleteAll);

  app.use('/api/adminUsers', router);
};