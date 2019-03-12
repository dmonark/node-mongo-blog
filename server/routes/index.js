const usersController = require('../controllers/user');
module.exports = (app) => {
  
	//users
  app.post('/api/register', usersController.create);
  app.post('/api/login', usersController.login);
  
};