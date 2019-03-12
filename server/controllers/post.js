const Post = require('../models/post');
const User = require('../models/user');

exports.create = (req, res) => {
	Post.create({
		title: req.body.title,
		desc: req.body.desc,
		category: req.body.category,
		authorId: req.decoded.uid,
		createdAt: Date.now()
	})
	.then(post => {
		res.status(201).send(post);
	})
	.catch(err => {
		res.status(422).send(err.errors);
	});
};

exports.list = (req, res) => {
	var filterList = {}
	if(req.query.category)
		filterList['category'] = req.query.category
	if(req.query.author)
		filterList['authorId'] = req.query.author
	
	Post.find(filterList)
	.then(posts => {
		res.status(200).send(posts);
	})
	.catch(err => {
		res.status(422).send(err.errors);
	});
};

exports.index = (req, res) => {
	Post.findOne({
		'_id': req.params.id
	})
	.then(post => {
		User.findOne({
			'_id': post.authorId
		})
		.then(user => {
			res.status(200).send({post, user});
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});		
	})
	.catch(err => {
		res.status(422).send(err.errors);
	});
};
