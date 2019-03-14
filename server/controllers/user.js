const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.create = (req, res) => {
	User.create({
		username: req.body.username,
		email: req.body.email,
		name: req.body.name,
		password: req.body.password,
		bio: req.body.bio
	})
	.then(user => {
		res.status(201).send(user);
	})
	.catch(err => {
		res.status(422).send(err.errors);
	});
};

exports.login = (req, res) => {
	User.findOne({
		email: req.body.email,
		password: req.body.password,
	}, 'id name bio')
	.then(user => {
		if(!user){
			res.status(422).send({
				message: 'Auth Faled'
			})
		} else {
			var secret = 'secret';
			var token = jwt.sign({
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
	})
	.catch(err => {
		res.status(422).send(err.errors);
	});
};

exports.list = (req, res) => {
	
	User.find({}, 'name id')
	.then(users => {
		res.status(200).send(users);
	})
	.catch(err => {
		res.status(422).send(err.errors);
	});
};