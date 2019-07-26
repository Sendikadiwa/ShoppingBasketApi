const mongoose = require('mongoose')

const itemSchema = mongoose.model(
	'Item',
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 50,
			trim: true,
		},
		completed: {
			type: Boolean,
			default: false,
		},
	}),
)
module.exports = itemSchema
