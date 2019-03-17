exports.createBlog = (req, res, next) => {
	var categoriesList = ['tech', 'science', 'biology', 'cars']
	if(!req.body.title)
		return res.status(422).send({
      message: 'Title is missing',
    });
	else if (!req.body.category)
    return res.status(422).send({
      message: 'Category is missing',
    });
	else if (categoriesList.indexOf(req.body.category) < 0)
    return res.status(422).send({
      message: 'Category is not valid',
    });
	else if (!req.body.desc)
    return res.status(422).send({
      message: 'Desc is missing',
    });
	else
		next();
};

exports.createComment = (req, res, next) => {
	if (!req.body.text)
    return res.status(422).send({
      message: 'Comment Text is missing',
    });
	else
		next();
};
