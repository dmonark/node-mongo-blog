let jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
  let token = req.headers['x-token'];
	if (token) {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: 'Auth Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({
      message: 'Auth Token is missing'
    });
  }
};

module.exports = {
  checkToken: checkToken
}