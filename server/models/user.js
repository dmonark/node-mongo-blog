"use strict";

var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    trim: true,
    max: 40
  },
  name: {
    type: String,
    required: true,
    max: 100
  },
  password: {
    type: String,
    required: true,
    max: 100
  },
  bio: {
    type: String,
    max: 240,
    default: ''
  }
});
UserSchema.plugin(uniqueValidator); // Export the model

module.exports = mongoose.model('User', UserSchema);