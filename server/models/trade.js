var mongoose = require('mongoose');

var tradeSchema = mongoose.Schema({
	date: {
		type: Date,
		required: [true, 'Date is required.'],
		trim: true,
	},
	symbol: {
		type: String,
		required: [true, 'Symbol id required.'],
		trim: true,
		uppercase: true,
	},
	type: {
		type: String,
		required: [true, 'Transaction Type is required. (LONG | SHORT)'],
		enum: ['LONG', 'SHORT'],
		uppercase: true,
	},
	timeline: [
		{
			action: {
				type: String,
				required: [true, 'Timeline Action is required.'],
				uppercase: true,
				enum: ['BUY', 'SELL'],
			},
			time: {
				type: Date,
				required: [true, 'Timeline Time is required.'],
			},
			price: {
				type: Number,
				min: [0, 'Timeline Price should be greater than zero.'],
				required: [true, 'Timeline Price is required.'],
			},
			quantity: {
				type: Number,
				min: [0, 'Timeline Quantity should be greater than zero'],
				required: [true, 'Quantity is required'],
			},
		},
	],
	stops: [
		{
			price: {
				type: Number,
				required: [true, 'Stop price is required.'],
				min: [0, 'Stop price should be greater than zero'],
			},
			reason: {
				type: String,
				trim: true,
			},
		},
	],
	targets: [
		{
			price: {
				type: Number,
				required: [true, 'Target price is required.'],
				min: [0, 'Target price should be greater than zero'],
			},
			reason: {
				type: String,
				trim: true,
			},
		},
	],
	reasonToEnter: {
		type: String,
		trim: true,
	},
	reasonToExit: {
		type: String,
		trim: true,
	},
	notes: {
		type: String,
		trim: true,
	},
	commission: {
		type: Number,
		min: [0, 'Commission should be greater than zero.'],
		default: 0,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'User is required.'],
	},
	setup: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Setup',
	},
});

var Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
