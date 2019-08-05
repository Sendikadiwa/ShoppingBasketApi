const express = require('express');
const users = require('../routes/api/users');

module.exports = function(app) {
	app.use(express.json({ extended: false })); // parsing json requests

	// define application routes
	app.use('/api/v1/users', users);
};
