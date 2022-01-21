const db = require("../model/sequelize");
const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;
const User = db.user;
const UserHistory = db.user_history;
const CarHistory = db.car_history;

// Create and Save a new Usera
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
  const threshold = new Date(Date.now()-7*24*60*60*1000);
  CarHistory.findAll(
    {
      attributes: [[Sequelize.fn('sum', Sequelize.col('distance')), 'total']],
      where:{ startTime:{[Op.gt] : threshold,[Op.gt] : Date.now()
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
        error: err
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

