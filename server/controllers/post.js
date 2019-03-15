const Post = require('../models/post');
const User = require('../models/user');

exports.create = (req, res) => {
	Post.create({
		title: req.body.title,
		desc: req.body.desc,
		category: req.body.category,
		author: req.decoded.uid,
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
		filterList['author'] = req.query.author
	
	Post.find(filterList, 'id title desc category likes author createdAt')
	.populate('author', 'name')
	.then(posts => {
		res.status(200).send(posts)
	})
	.catch(err => {
		res.status(422).send(err.errors);
	});
};

exports.index = (req, res) => {
	Post.findOne({
		'_id': req.params.id
	})
	.populate('author', 'name')
	.then(post => {
		res.status(200).send(post);
	})
	.catch(err => {
		res.status(422).send(err.errors);
	});
};

exports.deleteBlog = (req, res) => {
	Post.findOneAndDelete({
		'_id': req.params.id,
		'author': req.decoded.uid
	})
	.then(post => {
		res.status(200).send(post);
	})
	.catch(err => {
		res.status(422).send(err.errors);
	});
};

exports.createComment = (req, res) => {
	Post.update({
		'_id': req.params.id
	},{
		$push: {
			comments: {
				"text": req.body.text,
				"user": req.decoded.uid,
				"createdAt": Date.now()
			}
		}
	})
	.then(post => {
		res.status(201).send(post);
	})
	.catch(err => {
		res.status(422).send(err.errors);
	});
};

exports.deleteComment = (req, res) => {
	Post.update({
		'_id': req.params.id
	},{
		$pull: {
			comments: {
				'_id': req.params.commentID,
				'user': req.decoded.uid
			}
		}
	})
	.then(comment => {
		res.status(200).send(comment);
	})
	.catch(err => {
		res.status(422).send(err.errors);
	});
};

exports.comment = (req, res) => {
	Post.findOne({
		'_id': req.params.id
	}, 'comments')
	.populate('comments.user', 'name')
	.then(data => {
		res.status(200).send(data);		
	})
	.catch(err => {
		res.status(422).send(err.errors);
	});
};

exports.like = (req, res) => {
	Post.update({
		'_id': req.params.id
	},{
		$push: {
			likes: {
				"user": req.decoded.uid,
				"createdAt": Date.now()
			}
		}
	})
	.then(like => {
		res.status(201).send(like);
	})
	.catch(err => {
		res.status(422).send(err.errors);
	});
};

exports.unlike = (req, res) => {
	Post.update({
		'_id': req.params.id
	},{
		$pull: {
			likes: {
				"user": req.decoded.uid,
			}
		}
	})
	.then(like => {
		res.status(200).send(like);
	})
	.catch(err => {
		res.status(422).send(err.errors);
	});
};

exports.likeList = (req, res) => {
	Post.findOne({
		'_id': req.params.id
	}, 'likes')
	.populate('likes.user', 'name')
	.then(data => {
		res.status(200).send(data);		
	})
	.catch(err => {
		res.status(422).send(err.errors);
	});
};