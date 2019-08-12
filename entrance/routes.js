const express = require("express");
const users = require("../routes/api/users");
const auth = require("../routes/api/auth");
const baskets = require("../routes/api/baskets");
const error = require("../middleware/error");

module.exports = function(app) {
	app.use(express.json({ extended: false })); // parsing json requests

	// define application routes
	app.use("/api/v1/users", users);
	app.use("/api/v1/auth", auth);
	app.use("/api/v1/baskets", baskets);

	app.use(error);
};
