"use strict";

var User = require('../models/user');

var jwt = require('jsonwebtoken');

exports.create = function (req, res) {
  User.create({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    bio: req.body.bio
  }).then(function (user) {
    res.status(201).send(user);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

exports.update = function (req, res) {
  User.updateOne({
    _id: req.decoded.uid
  }, {
    name: req.body.name,
    bio: req.body.bio
  }).then(function (user) {
    res.status(200).send(user);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

exports.changePassword = function (req, res) {
  User.updateOne({
    _id: req.decoded.uid,
    password: req.body.oldPassword
  }, {
    password: req.body.newPassword
  }).then(function (user) {
    if (user.nModified === 1)
			res.status(200).send(user);
		else res.status(422).send({ //nModified will be 0 when no user found
      message: "User Not Found"
    });
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

exports.login = function (req, res) {
  User.findOne({
    email: req.body.email,
    password: req.body.password
  }, 'id name bio').then(function (user) {
    if (!user) {
      res.status(422).send({
        message: 'Auth Failed'
      });
    } else {
      var secret = 'secret';
      var token = jwt.sign({ //encoding the token for 1 year
        uid: user.id
      }, secret, {
        expiresIn: '1y',
        algorithm: 'HS256'
      });
      res.status(200).send({
        token: token,
        user: user
      });
    }

    res.status(200).send(user);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

exports.list = function (req, res) {
  User.find({}, 'name id bio').then(function (users) {
    res.status(200).send(users);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};