const mongoose = require('mongoose')
const config = require('config')

const dbConnection = async () => {
	const db = config.get('db')
	await mongoose.connect(db, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	console.log(`Connected to ${config.get('db')}...`)
}

module.exports = dbConnection
