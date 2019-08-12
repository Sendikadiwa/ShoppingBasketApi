const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

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

function validateItem(item) {
	const schema = {
		name: Joi.string()
			.min(3)
			.max(50)
			.trim()
			.required(),
		completed: Joi.boolean(),
	};
	return Joi.validate(item, schema);
}

module.exports = { itemSchema, validateItem };
