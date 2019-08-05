const mongoose = require('mongoose');
const { itemSchema } = require('./item');

const basketSchema = new mongoose.Schema({
	category: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		maxlength: 50,
	},
	description: {
		type: String,
		minlength: 10,
		maxlength: 50,
		trim: true,
	},
	item: {
		type: itemSchema,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	created_date: {
		type: Date,
		default: Date.now,
	},
	modified_date: {
		type: Date,
		default: Date.now,
	},
});
const Basket = mongoose.model('Basket', basketSchema);

module.exports = {
	Basket,
};
