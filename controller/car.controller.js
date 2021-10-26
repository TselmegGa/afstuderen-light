const db = require("../model/sequelize");
const Car = db.car;
const Price = db.price;
const Op = db.Sequelize.Op;

// Create and Save a new Car
exports.create = (req, res) => {
    // Validate request
    const token = req.body.token || req.param('token') || req.headers['x-access-token'];
    const role = db.parseJwt(token).role;
    if (role == 1) {
      res.status(400).json({
        success: false,
        error: "You dont have permission"
      });
      return;
    }
    if (req.body.size == 0 ||req.body.size == 1 ||req.body.size == 2) {}
    else{
        res.status(400).json({
          success: false,
          error: "Type can not be empty!"
        });
        return;
    }
    if (!req.body.brand) {
      res.status(400).json({
        success: false,
        error: "Brand can not be empty!"
      });
      return;
    }
    if (!req.body.wheelchair) {
        res.status(400).json({
          success: false,
          error: "Wheelchair suitibilty can not be empty!"
        });
        return;
    }
    if (!req.body.price) {
      res.status(400).json({
        success: false,
        error: "Price can not be empty!"
      });
      return;
    }
    if (!req.body.name) {
      res.status(400).json({
        success: false,
        error: "Name can not be empty!"
      });
      return;
    }
    
    // Create a Car
    const car = {
      name: req.body.name,
      size: req.body.size,
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
      success: false,
      error: "Failed to create car!"+ err
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
      success: false,
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
            success: false,
            error: "Cannot find Car with id="+ id
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: "Error trying to get Car with id="+ id
        });
      });
};

// Update a Car by the id in the request
exports.update = (req, res) => {
  const token = req.body.token || req.param('token') || req.headers['x-access-token'];
  const role = db.parseJwt(token).role;
  if (role == 1) {
    res.status(400).json({
      success: false,
      error: "You dont have permission"
    });
    return;
  }
  Car.update(req.body, {
    where: { id: req.params.id }
  })
    .then(num => {
      if (num == 1) {
        res.json({
          success: true,
          message: "Car was updated successfully."
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Error while updating to get Car" 
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "Error trying to update Car" 
      });
    });
          
};

// Delete a Car with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  const token = req.body.token || req.param('token') || req.headers['x-access-token'];
  const role = db.parseJwt(token).role;
  if (role == 1) {
    res.status(400).json({
      success: false,
      error: "You dont have permission"
    });
    return;
  }
  Car.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.json({
          success: true,
          message: "Car was deleted successfully!"
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Error trying to delete Car" 
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "Error trying to delete Car" 
      });
    });
};
