const winston = require('winston');
const express = require("express");
const app = express();

require("./startup/logging");
require("./startup/db")();
require("./startup/auth")();
require("./startup/routes")(app);
require("./startup/validation")();
require("./startup/prod")(app);

app.listen(3000, () => {
  winston.info("Server running on port : 3000");
});