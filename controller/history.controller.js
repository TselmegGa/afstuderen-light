const db = require("../model/sequelize");
const Op = db.Sequelize.Op;
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
          success: false,
          error: "Failed to create car history"
        });
      });
    }).catch(err => {
    res.status(500).json({
      success: false,
      error: "Failed to create user history"
    });
  })
      
}
exports.findAllCarHistoryLastDays = (req, res) => {
  CarHistory.findAll(
    {
      attributes: [[sequelize.fn('sum', sequelize.col('distance')), 'total']],
      where:{ created:{[Op.gt] :Sequelize.literal('CURDATE() - INTERVAL 7 DAY'),[Op.lt]: NOW
    }}})
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
        success: false,
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
        success: false,
        error: "Error trying to get all user" 
      });
    });
};


exports.findUserHistoryById = (req, res) => {

  const token = req.body.token || req.param('token') || req.headers['x-access-token'];
  const email = db.parseJwt(token).email;

  User.findByPk(req.params.id).then(user => {
    if(user.privacy || user.email == email){
    UserHistory.findAll({where:{ UserId: req.params.id }})
    .then(data => {
      res.json({
        success: true,
        model: {data}      
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "Error trying to get all user history" 
      });
    });
  }else{
    res.status(400).json({
      success: false,
      error: "User must set privacy off to view history" 
    });
  }
  }).catch(err => {
    res.status(500).json({
      success: false,
      error: "Error trying to get all user"
    });
  });
  
};

