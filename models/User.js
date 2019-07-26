const mongoose = require('mongoose')

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
})
const User = mongoose.model('User', userSchema)
module.exports = { User }
