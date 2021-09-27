var express = require('express');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    
    const token = req.body.token || req.param('token') || req.headers['x-access-token'];
    
    if (token == null) return res.json({ success: false, message: 'Failed to find token.' });
    
    if(jwt.verify(token, process.env.TOKEN_SECRET)) {            
    
        next()
        
    }
    else{
        return res.json({ success: false, message: 'Failed to authenticate token.' });
    }
}
