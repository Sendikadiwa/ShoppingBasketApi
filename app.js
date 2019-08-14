const express = require("express");
const app = express();
const dbConnection = require("./entrance/db");
const config = require("config");

// Db connection
dbConnection();

// routes
require("./entrance/routes")(app);

if (!config.get("secretOrPrivateKey")) {
	console.error("FATAL ERROR: secretOrPrivateKey is not defined.");
	process.exit(1);
}

const port = process.env.PORT || 9000;

const server = app.listen(port, () => {
	console.log(`Server set up on port ${port}`);
});

module.exports = server;
