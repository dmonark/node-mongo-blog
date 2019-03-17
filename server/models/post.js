"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    require: true,
    trim: true,
    max: 200
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
var LikeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
var PostSchema = new Schema({
  title: {
    type: String,
    require: true,
    trim: true,
    max: 100
  },
  desc: {
    type: String,
    require: true,
    trim: true,
    max: 2000
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    require: true,
    lowercase: true,
    trim: true,
    max: 240
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: {
    type: [CommentSchema],
    default: []
  },
  likes: {
    type: [LikeSchema],
    default: []
  }
}); // Export the model

module.exports = mongoose.model('Post', PostSchema);