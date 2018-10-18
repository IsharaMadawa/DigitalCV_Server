const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function() {
  mongoose
    .connect(
      "mongodb://localhost:27017/vcenter",
      { useNewUrlParser: true, useCreateIndex: true }
    )
    .then(() => winston.info('Connected to MongoDB...'))
    .catch(err => winston.error('Could not connect to MongoDB...'));
};
