"use strict";

var Post = require('../models/post');

var User = require('../models/user');

exports.create = function (req, res) {
  Post.create({
    title: req.body.title,
    desc: req.body.desc,
    category: req.body.category,
    author: req.decoded.uid
  })
	.then(function (post) {
    res.status(201).send(post);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

exports.list = function (req, res) {
  var filterList = {};
  if (req.query.category) filterList['category'] = req.query.category;
  if (req.query.author) filterList['author'] = req.query.author;
  Post.find(filterList, 'id title desc category likes author createdAt')
	.sort({createdAt: -1})
	.populate('author', 'name')
	.then(function (posts) {
    res.status(200).send(posts);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

exports.index = function (req, res) {
  Post.findOne({
    '_id': req.params.id
  }).populate('author', 'name')
	.then(function (post) {
    res.status(200).send(post);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

exports.deleteBlog = function (req, res) {
  Post.findOneAndDelete({
    '_id': req.params.id,
    'author': req.decoded.uid
  }).then(function (post) {
    res.status(200).send(post);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

exports.createComment = function (req, res) {
  Post.findOneAndUpdate({
    '_id': req.params.id
  }, {
    $push: {
      comments: {
        "text": req.body.text,
        "user": req.decoded.uid
      }
    }
  },{
		new: true
	})
	.populate('comments.user', 'name')
	.then(function (post) {
    res.status(201).send(post);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

exports.deleteComment = function (req, res) {
  Post.findOneAndUpdate({
    '_id': req.params.id
  }, {
    $pull: {
      comments: {
        '_id': req.params.commentID,
        'user': req.decoded.uid
      }
    }
  },{
		new: true
	})
	.populate('comments.user', 'name')
	.then(function (comment) {
    res.status(200).send(comment);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

exports.comment = function (req, res) {
  Post.findOne({
    '_id': req.params.id
  }, 'comments')
	.populate('comments.user', 'name')
	.then(function (data) {
    res.status(200).send(data);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

exports.like = function (req, res) {
  Post.updateOne({
    '_id': req.params.id
  }, {
    $push: {
      likes: {
        "user": req.decoded.uid
      }
    }
  }).then(function (like) {
    res.status(201).send(like);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

exports.unlike = function (req, res) {
  Post.updateOne({
    '_id': req.params.id
  }, {
    $pull: {
      likes: {
        "user": req.decoded.uid
      }
    }
  }).then(function (like) {
    res.status(200).send(like);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

exports.likeList = function (req, res) {
  Post.findOne({
    '_id': req.params.id
  }, 'likes').populate('likes.user', 'name').then(function (data) {
    res.status(200).send(data);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};