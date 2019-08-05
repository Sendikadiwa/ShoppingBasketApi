const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const config = require('config');

// Define user model
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		minlength: 10,
		maxlength: 255,
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

// Generate JWT token
userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({ _id: this._id }, config.get('secretOrPrivateKey'), {
		expiresIn: 360000,
	});
	return token;
};

// Encrypt plain user password only when it is modified
userSchema.pre('save', async function(next) {
	// check if doc is modified
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 10);
	}
	next();
});

const User = mongoose.model('User', userSchema);

// validate user fields
function validate(user) {
	const schema = {
		name: Joi.string()
			.min(3)
			.max(50)
			.trim()
			.required(),
		email: Joi.string()
			.min(10)
			.max(255)
			.trim()
			.required()
			.email(),
		password: Joi.string()
			.min(5)
			.max(1024)
			.trim()
			.required(),
	};
	return Joi.validate(user, schema);
}

module.exports = { User, validate };
