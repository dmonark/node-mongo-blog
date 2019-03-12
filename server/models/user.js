var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type: String,
		require: true,
		unique: true,
		lowercase: true,
		trim: true,
		max: 12
	},
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

// Export the model
module.exports = mongoose.model('User', UserSchema);