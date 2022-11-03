const db = require("../models");
const Admin = db.adminUser;
const Op = db.Sequelize.Op;

// Create and Save a new Admin User
exports.create = (req, res) => {
 // Validate request
 if (!req.body.email) {
  res.status(400).send({
    message: "Content can not be empty!"
  });
  return;
}

// Create a Admin User
const user = {
  email: req.body.email,
  firstName: req.body.firstName,
  lastName: req.body.lastName
};

// Save Admin User in the database
Admin.create(user)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Admin User."
    });
  });
};

// Retrieve all Admin Users from the database.
exports.findAll = (req, res) => {
  Admin.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Admin Users."
      });
    });
};

// Find a single Admin User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Admin.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Admin User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Admin User with id=" + id
      });
    });
};

// Update a Admin User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Admin.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Admin User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Admin User with id=${id}. Maybe Admin User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Admin User with id=" + id
      });
    });
};

// Delete a Admin User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Admin.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Admin User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Admin User with id=${id}. Maybe Admin User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Admin User with id=" + id
      });
    });
};

// Delete all Admin User from the database.
exports.deleteAll = (req, res) => {
  Admin.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Admin Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Admin Users."
      });
    });
};
