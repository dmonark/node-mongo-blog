exports.create = (req, res, next) => {
	
	var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	
	if(!req.body.email)
		return res.status(422).send({
      message: 'Email is missing',
    });
	else if(!emailRegex.test(String(req.body.email).trim().toLowerCase()))
		return res.status(422).send({
      message: 'Email is not valid',
    });
	else if (!req.body.name)
    return res.status(422).send({
      message: 'Name is missing',
    });
	else if (!req.body.password)
    return res.status(422).send({
      message: 'Password is missing',
    });
	else
		next();
};

exports.update = (req, res, next) => {
	if (!req.body.name)
    return res.status(422).send({
      message: 'Name is missing',
    });
	else
		next();
};

exports.changePassword = (req, res, next) => {
	if (!req.body.oldPassword)
    return res.status(422).send({
      message: 'Old Password is missing',
    });
	else if (!req.body.newPassword)
    return res.status(422).send({
      message: 'New Password is missing',
    });
	else
		next();
};

exports.login = (req, res, next) => {
	var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	
	if(!req.body.email)
		return res.status(422).send({
      message: 'Email is missing',
    });
	else if(!emailRegex.test(String(req.body.email).trim().toLowerCase()))
		return res.status(422).send({
      message: 'Email is not valid',
    });
	else if (!req.body.password)
    return res.status(422).send({
      message: 'Password is missing',
    });
	else
		next();
};