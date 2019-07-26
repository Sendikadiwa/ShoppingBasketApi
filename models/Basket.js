const mongoose = require('mongoose')
const { itemSchema } = require('./item')


const basketSchema = new mongoose.Schema({
	category: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		maxlength: 50,
	},
	item: {
		type: itemSchema,
		required: true,
	},
	modified_date: {
		type: Date,
		default: Date.now,
	},
})
const Basket = mongoose.model('Basket', basketSchema)

module.exports = {
	Basket,
}
