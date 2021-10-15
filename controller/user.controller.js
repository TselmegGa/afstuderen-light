const db = require("../model/sequelize");
const User = db.user;
const Address = db.address;
const Op = db.Sequelize.Op;
var jwt = require('jsonwebtoken');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstname) {
        res.status(400).json({
          success: false,
          error: "First Name can not be empty!"
        });
        return;
      }
      if (!req.body.lastname) {
        res.status(400).json({
          success: false,
          error: "Last Name can not be empty!"
        });
        return;
      }
      if (!req.body.email) {
        res.status(400).json({
          success: false,
          error: "Email can not be empty!"
        });
        return;
      }
      if (!req.body.password) {
        res.status(400).json({
          success: false,
          error: "Password can not be empty!"
        });
        return;
      }
      if (req.body.address) {
        const address ={
        streetName:req.body.address.streetName,
        houseNumber:req.body.address.houseNumber,
        city:req.body.address.city,
        zipCode:req.body.address.zipCode
      }
      Address.create(address).then(data=>{
        create(req, res,data.id)

      }).catch(err => {
        res.status(500).json({
          success: false,
          error: "Failed to create address"
        });
      });
      }else{
        create(req, res,null)
      }
      
};
function create(req, res, id){
        // Create a User
        const user = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
          role: 0,
          licence: req.body.licence,
          privacy: req.body.privacy,
          AddressId: id,
        };
        token =  jwt.sign({email: user.email,  role: user.role }, process.env.TOKEN_SECRET, { expiresIn: '1800s' })
        // Save User in the database
        User.create(user)
          .then(data => {
            res.json({
              success: true,
              model: data,
              jwt: token
            });
          })
          .catch(err => {
            res.status(500).json({
              success: false,
              error: "Failed to create user"
            });
          });
}

// Retrieve all User from the database.
exports.findAll = (req, res) => {
  User.findAll({ include: { model: Address } })
    .then(data => {
      res.json({
        success: true,
        model: {data}      
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "Error trying to get all user" 
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    
    User.findByPk(id)
      .then(data => {
        if (data) {
          Address.findByPk(data.AddressId).then(address => {
            if (address) {
              res.json({
                success: true,
                model: {data, address}      
              });
            }
              
          })
          .catch(err => {
            res.status(500).json({
              success: false,
              error: "Error trying to get address" 
            });
          });
          
        } else {
          res.status(404).json({
            success: false,
            error: "Cannot find user with id="+ id
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: "Error trying to get user with id="+ id
        });
      });
};
exports.findOneByEmail = (req, res) => {
  const id = req.params.id;
  
  User.findOne({ where: { email: req.body.email, password: req.body.password } })
    .then(data => {
      if (data) {
        const accessToken = jwt.sign({ email: data.email,  role: data.role }, process.env.TOKEN_SECRET);
        if(data.AddressId){
        Address.findByPk(data.AddressId).then(address => {
          if (address) {
            res.json({
              success: true,
              model: {data, address},
              jwt: accessToken
            });
          }else {
            res.status(404).json({
              success: false,
              error: "Cannot find address"
            });
          }
        })
        .catch(err => {
          res.status(500).json({
            success: false,
            error: "Error trying to get address" 
          });
        });
      } else {
        res.json({
          success: true,
          model: data,
          jwt: accessToken
        });
      }
        
      } else {
        res.status(404).json({
          success: false,
          error: "Cannot find user"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "Error trying to get user"
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const token = req.body.token || req.param('token') || req.headers['x-access-token'];
  const email = db.parseJwt(token).email;
  
  User.findByPk(id)
      .then(data => {
        if(data.email === email){
        if(req.body.address){
        if (data.AddressId == null) {
          Address.create(req.body.address).then(address => {
            if (address) {
              update(req, res)
            }
              
          })
          .catch(err => {
            res.status(500).json({
              success: false,
              error: "Error trying to create address" 
            });
          });
          
        } else {
          Address.update(req.body.address, {where:{ id: data.AddressId }}).then(num => {
            if (num == 1) {
              update(req, res)
            }else {
              res.status(500).json({
                success: false,
                error: "Error while updating to get address" 
              });
            }
          })
          .catch(err => {
            res.status(500).json({
              success: false,
              error: "Error trying to update address"
            });
          });
        }
      }
      else{
        update(req,res)
      }
    }else{
      res.status(400).json({
        success: false,
        error: "You have permission to change this data" 
      });
    }
      })
};
function update(req, res){
  User.update(req.body, {
    where: { id: req.params.id }
  })
    .then(num => {
      if (num == 1) {
        res.json({
          success: true,
          message: "User was updated successfully."
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Error while updating to get user" 
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "Error trying to update user" 
      });
    });
}

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  const token = req.body.token || req.param('token') || req.headers['x-access-token'];
  const email = db.parseJwt(token).email;
  User.findByPk(id)
      .then(data => {
        if(data.email === email){
  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.json({
          success: true,
          message: "User was deleted successfully!"
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Error trying to delete user" 
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        succes: false,
        error: "Error trying to delete user" 
      });
    });
  }
  else{
    res.status(400).json({
      success: false,
      error: "You have permission to change this data" 
    });
  }
    })
};
