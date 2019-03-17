"use strict";

var jwt = require('jsonwebtoken');

var checkToken = function checkToken(req, res, next) {
  var token = req.headers['x-token'];

  if (token) { //checking the token
    jwt.verify(token, 'secret', function (err, decoded) { //decoding the token
      if (err) {
        return res.status(401).send({
          message: 'Auth Token is not valid'
        });
      } else {
        req.decoded = decoded; //setting up the key in req
        next();
      }
    });
  } else {
    return res.status(401).send({
      message: 'Auth Token is missing'
    });
  }
};

module.exports = {
  checkToken: checkToken
};