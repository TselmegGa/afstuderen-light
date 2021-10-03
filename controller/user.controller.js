const db = require("../model/sequelize");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
          message: "Name can not be empty!"
        });
        return;
      }
      if (!req.body.email) {
        res.status(400).send({
          message: "Email can not be empty!"
        });
        return;
      }
      if (!req.body.password) {
        res.status(400).send({
          message: "Password can not be empty!"
        });
        return;
      }
      if (!req.body.address) {
        res.status(400).send({
          message: "Address can not be empty!"
        });
        return;
      }
      // Create a User
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        licence: req.body.licence,
        privacy: req.body.privacy,
        address: req.body.address,
      };
    
      // Save Tutorial in the database
      User.create(user)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial."
          });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};