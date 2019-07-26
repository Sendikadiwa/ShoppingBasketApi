const express = require('express')
const baskets = require('../routes/api/baskets')

module.exports = function(app) {
	app.use(express.json({ extended: false })) // parsing json requests

	// define application routes
	app.use('/api/v1/baskets', baskets)
}
