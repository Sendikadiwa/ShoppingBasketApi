const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const { itemSchema } = require('./item');

const basketSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
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
	item: [itemSchema],
	completed: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	modifiedAt: {
		type: Date,
		default: Date.now,
	},
});
const Basket = mongoose.model('Basket', basketSchema);

// validate basket fields
function validate(basket) {
	const schema = {
		category: Joi.string()
			.min(3)
			.max(50)
			.required(),
		description: Joi.string()
			.min(10)
			.max(50),
	};
	return Joi.validate(basket, schema);
}
module.exports = {
	Basket,
	validate,
};
