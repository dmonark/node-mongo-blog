"use strict";

var userController = require('../controllers/user');

var blogController = require('../controllers/post');

var authChecker = require('../utils/auth');

var userValidator = require('../validator/user');

var blogValidator = require('../validator/post');

module.exports = function (app) {
  //users
  app.post('/api/register', userValidator.create, userController.create);
  app.post('/api/login', userValidator.login, userController.login);
  app.get('/api/user', userController.list);
  app.post('/api/user/update', authChecker.checkToken, userValidator.update, userController.update);
  app.post('/api/user/change_password', authChecker.checkToken, userValidator.changePassword, userController.changePassword); //blog

  app.post('/api/blog', authChecker.checkToken, blogValidator.createBlog, blogController.create);
  app.get('/api/blog', blogController.list);
  app.get('/api/blog/:id', blogController.index);
  app.delete('/api/blog/:id', authChecker.checkToken, blogController.deleteBlog); //comment

  app.post('/api/blog/:id/comment', authChecker.checkToken, blogValidator.createComment, blogController.createComment);
  app.get('/api/blog/:id/comment', blogController.comment);
  app.delete('/api/blog/:id/comment/:commentID', authChecker.checkToken, blogController.deleteComment); //likes

  app.post('/api/blog/:id/like', authChecker.checkToken, blogController.like);
  app.post('/api/blog/:id/unlike', authChecker.checkToken, blogController.unlike);
  app.get('/api/blog/:id/likes', blogController.likeList);
};