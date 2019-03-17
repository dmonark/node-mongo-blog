"use strict";

exports.create = function (req, res, next) { //Validation required while adding user 
  var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!req.body.email) 
		return res.status(422).send({
			message: 'Email is missing'
		});
	else if (!emailRegex.test(String(req.body.email).trim().toLowerCase())) 
		return res.status(422).send({
			message: 'Email is not valid'
		});
	else if (!req.body.name) 
		return res.status(422).send({
			message: 'Name is missing'
		});
	else if (!req.body.password) 
		return res.status(422).send({
			message: 'Password is missing'
		});
	else next();
};

exports.update = function (req, res, next) { //Validation required while updating user Name and Bio
  if (!req.body.name) 
		return res.status(422).send({
			message: 'Name is missing'
		});
	else next();
};

exports.changePassword = function (req, res, next) { //Validation which required while updating the password 
  if (!req.body.oldPassword) 
		return res.status(422).send({
			message: 'Old Password is missing'
		});
	else if (!req.body.newPassword) 
		return res.status(422).send({
			message: 'New Password is missing'
		});
	else next();
};

exports.login = function (req, res, next) { //Validation which required while login
  var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!req.body.email) 
		return res.status(422).send({
			message: 'Email is missing'
		});
	else if (!emailRegex.test(String(req.body.email).trim().toLowerCase())) 
		return res.status(422).send({
			message: 'Email is not valid'
		});
	else if (!req.body.password) 
		return res.status(422).send({
			message: 'Password is missing'
		});
	else next();
};