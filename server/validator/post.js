"use strict";

exports.createBlog = function (req, res, next) { //Validation required while creating blog 
  var categoriesList = ['tech', 'science', 'biology', 'cars']; //Category is now static data
  if (!req.body.title) 
		return res.status(422).send({
    message: 'Title is missing'
		});
	else if (!req.body.category) 
		return res.status(422).send({
			message: 'Category is missing'
		});
	else if (categoriesList.indexOf(req.body.category) < 0) 
		return res.status(422).send({
			message: 'Category is not valid'
		});
	else if (!req.body.desc) 
		return res.status(422).send({
			message: 'Desc is missing'
		});
	else 
		next();
};

exports.createComment = function (req, res, next) { //Validation required while creating comment on any blog
  if (!req.body.text) 
		return res.status(422).send({
			message: 'Comment Text is missing'
		});
	else next();
};