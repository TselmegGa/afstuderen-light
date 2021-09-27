var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

router.post('/register', (req, res) => {

  //database insert

  const token = generateAccessToken({ username: req.body.username });
  res.json(token);

});
router.post('/login', (req, res) => {

    //database insert
  
    const token = generateAccessToken({ username: req.body.username });
    res.json(token);
  
});
module.exports = router;