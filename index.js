const winston = require('winston');
const express = require("express");
const app = express();

require("./startup/logging");
require("./startup/db")();
require("./startup/auth")();
require("./startup/routes")(app);
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  winston.info("Server running on port : 3000");
});

module.exports = server
