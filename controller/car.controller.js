const db = require("../model/sequelize");
const Car = db.car;
const Price = db.price;
const Op = db.Sequelize.Op;

// Create and Save a new Car
exports.create = (req, res) => {
    // Validate request
    if (!req.body.type) {
        res.status(400).json({
          succes: false,
          error: "Type can not be empty!"
        });
        return;
    }
    if (!req.body.brand) {
      res.status(400).json({
        succes: false,
        error: "Brand can not be empty!"
      });
      return;
    }
    if (!req.body.wheelchair) {
        res.status(400).json({
          succes: false,
          error: "Wheelchair suitibilty can not be empty!"
        });
        return;
    }
    if (!req.body.price) {
      res.status(400).json({
        succes: false,
        error: "Price can not be empty!"
      });
      return;
    }
    if (!req.body.name) {
      res.status(400).json({
        succes: false,
        error: "Name can not be empty!"
      });
      return;
    }
    // Create a Car
    const car = {
      name: req.body.name,
      type: req.body.type,
      brand: req.body.brand,
      wheelchair: req.body.wheelchair,
      price: req.body.price
    };
    // Save Car in the database
    Car.create(car)
    .then(data => {
      res.json({
      success: true,
      model: data
      });
    })
    .catch(err => {
      res.status(500).json({
      succes: false,
      error: "Failed to create car!"
      });
    });
    
};


// Retrieve all Car from the database.
exports.findAll = (req, res) => {
Car.findAll()
  .then(data => {
    res.json({
      success: true,
      model: data 
    });
  })
  .catch(err => {
    res.status(500).json({
      succes: false,
      error: "Error trying to get all Car" 
    });
  });
};

// Find a single Car with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    
    Car.findByPk(id)
      .then(data => {
        if (data) {
              res.json({
                success: true,
                model: data
          })
          
          
        } else {
          res.status(404).json({
            succes: false,
            error: "Cannot find Car with id="+ id
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          succes: false,
          error: "Error trying to get Car with id="+ id
        });
      });
};

// Update a Car by the id in the request
exports.update = (req, res) => {

  Car.update(req.body, {
    where: { id: req.params.id }
  })
    .then(num => {
      if (num == 1) {
        res.json({
          succes: true,
          message: "Car was updated successfully."
        });
      } else {
        res.status(500).json({
          succes: false,
          error: "Error while updating to get Car" 
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        succes: false,
        error: "Error trying to update Car" 
      });
    });
          
};

// Delete a Car with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Car.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.json({
          succes: true,
          message: "Car was deleted successfully!"
        });
      } else {
        res.status(500).json({
          succes: false,
          error: "Error trying to delete Car" 
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        succes: false,
        error: "Error trying to delete Car" 
      });
    });
};
