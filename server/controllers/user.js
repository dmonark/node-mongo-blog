const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.create = (req, res) => {
	User.create({
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

exports.update = (req, res) => {
	User.updateOne({
		_id: req.decoded.uid
	},{
		name: req.body.name,
		bio: req.body.bio
	})
	.then(user => {
		res.status(200).send(user)
	})
	.catch(err => {
		res.status(422).send(err.errors);
	});
}

exports.changePassword = (req, res) => {
	User.updateOne({
		_id: req.decoded.uid,
		password: req.body.oldPassword
	},{
		password: req.body.newPassword
	})
	.then(user => {
		if(user.nModified === 1)
			res.status(200).send(user);
		else
			res.status(422).send({
				message: "User Not Found"
			});
	})
	.catch(err => {
		res.status(422).send(err.errors);
	});
}

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
	User.find({}, 'name id bio')
	.then(users => {
		res.status(200).send(users);
	})
	.catch(err => {
		res.status(422).send(err.errors);
	});
};