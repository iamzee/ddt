var mongoose = require('mongoose');

var setupSchema = mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: [true, 'Title is required.'],
	},
	description: {
		type: String,
		trim: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'User is required.'],
	},
});

var Setup = mongoose.model('Setup', setupSchema);

module.exports = Setup;
