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
	
	Post.find(filterList, 'id title desc category likes')
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

exports.createComment = (req, res) => {
	Post.update({
		'_id': req.params.id
	},{
		$push: {
			comments: {
				"text": req.body.text,
				"userId": req.decoded.uid,
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

exports.comment = (req, res) => {
	Post.findOne({
		'_id': req.params.id
	}, 'comments')
	.then(data => {
		var commentsCopy = data.comments
		userList = []
		for(var i = 0; i < commentsCopy.length; i++){
			userList.push(commentsCopy[i].userId)
		}
		User.find({
			'_id': { $in : userList}
		}, 'name')
		.then(users => {
			for(var j = 0; j < commentsCopy.length; j++){
				commentsCopy[j]['author'] = users.find(user => user._id == commentsCopy[j].userId)
			}
			res.status(200).send(commentsCopy);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});		
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
				"userId": req.decoded.uid,
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
				"userId": req.decoded.uid,
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
	.then(data => {
		var likesCopy = data.likes
		userList = []
		for(var i = 0; i < likesCopy.length; i++){
			userList.push(likesCopy[i].userId)
		}
		User.find({
			'_id': { $in : userList}
		}, 'name')
		.then(users => {
			for(var j = 0; j < likesCopy.length; j++){
				likesCopy[j]['author'] = users[j]
			}
			res.status(200).send(likesCopy);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});		
	})
	.catch(err => {
		res.status(422).send(err.errors);
	});
};