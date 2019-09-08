const express = require("express");
const config = require("config");
const cors = require("cors");
const dbConnection = require("./entrance/db");
const logger = require("./entrance/log");

const app = express();
// Db connection
dbConnection();
// enable all cors requests
app.use(cors());
// routes
require("./entrance/routes")(app);

require("./entrance/production")(app);

if (!config.get("secretOrPrivateKey")) {
  throw new Error("FATAL ERROR: secretOrPrivateKey is not defined.");
}

const port = process.env.PORT || 9000;

const server = app.listen(port, () => {
  logger.info(`Server set up on port ${port}`);
});

module.exports = server;
