var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
		type: String,
		require: true, 
		trim: true,
		max: 100
	},
	category: {
		type: String,
		require: true,
		lowercase: true,
		trim: true,
		max: 240
	},
	authorId: {
		type: String,
		require: true,
		trim: true,
		max: 200,
	},
	comments: {
		type: Array,
		default: []
	},
	likes: {
		type: Array,
		default: []
	}
});

// Export the model
module.exports = mongoose.model('Post', PostSchema);