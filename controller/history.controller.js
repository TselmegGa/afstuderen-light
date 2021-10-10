const db = require("../model/sequelize");
const User = db.user;
const UserHistory = db.user_history;
const CarHistory = db.car_history;

// Create and Save a new User
exports.create = (req, res) => {
      
  UserHistory.create(req.body)
  .then(u_history => {
    CarHistory.create(req.body)
      .then(c_history => {
        res.json({
          success: true,
          model: {u_history, c_history}
        });
      }).catch(err => {
        res.status(500).json({
          succes: false,
          error: err
        });
      });
    }).catch(err => {
    res.status(500).json({
      succes: false,
      error: err
    });
  })
      
}
exports.findAllCarHistory = (req, res) => {
  CarHistory.findAll()
    .then(data => {
      res.json({
        success: true,
        model: {data}      
      });
    })
    .catch(err => {
      res.status(500).json({
        succes: false,
        error: "Error trying to get all user" 
      });
    });
};
exports.findAllCarHistoryById = (req, res) => {
  CarHistory.findAll({where:{ CarId: req.params.id }})
    .then(data => {
      res.json({
        success: true,
        model: {data}      
      });
    })
    .catch(err => {
      res.status(500).json({
        succes: false,
        error: "Error trying to get all user" 
      });
    });
};


exports.findUserHistoryById = (req, res) => {

  User.findByPk(req.params.id).then(user => {
    if(user.privacy ){
    UserHistory.findAll({where:{ UserId: req.params.id }})
    .then(data => {
      res.json({
        success: true,
        model: {data}      
      });
    })
    .catch(err => {
      res.status(500).json({
        succes: false,
        error: "Error trying to get all user history" +err
      });
    });
  }else{
    res.status(400).json({
      succes: false,
      error: "User must set privacy off to view history" 
    });
  }
  }).catch(err => {
    res.status(500).json({
      succes: false,
      error: "Error trying to get all user" +err
    });
  });
  
};

