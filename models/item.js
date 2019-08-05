const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
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
});

const Item = mongoose.model('Item', itemSchema);

module.exports = { Item, itemSchema };
