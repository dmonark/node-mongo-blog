const userController = require('../controllers/user');
const blogController = require('../controllers/post');

const authChecker = require('../utils/auth');

module.exports = (app) => {
	//users
  app.post('/api/register', userController.create);
  app.post('/api/login', userController.login);
  app.get('/api/user', userController.list);
  app.post('/api/user/update', authChecker.checkToken, userController.update);
	app.post('/api/user/change_password', authChecker.checkToken, userController.changePassword);
	
	//blog
	app.post('/api/blog', authChecker.checkToken, blogController.create);
	app.get('/api/blog', blogController.list);
	app.get('/api/blog/:id', blogController.index);
	app.delete('/api/blog/:id', authChecker.checkToken, blogController.deleteBlog);
	
	//comment
	app.post('/api/blog/:id/comment', authChecker.checkToken, blogController.createComment);
	app.get('/api/blog/:id/comment', blogController.comment);
	app.delete('/api/blog/:id/comment/:commentID', authChecker.checkToken, blogController.deleteComment)
	
	//likes
	app.post('/api/blog/:id/like', authChecker.checkToken, blogController.like);
	app.post('/api/blog/:id/unlike', authChecker.checkToken, blogController.unlike);
	app.get('/api/blog/:id/likes', blogController.likeList);
};