const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
const config = require("config");

module.exports = function() {
  process.on("unhandledRejection", ex => {
    throw ex;
  });

  winston.exceptions.handle(
    new winston.transports.MongoDB({
      db: config.get('db'),
      capped: true,
      name: "logs",
      collection: "logs",
      options: { useNewUrlParser: true }
    }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );
  winston.exitOnError = false;

  winston.configure({
    transports: [
      new winston.transports.Console({
        timestamp: function() {
          return new Date();
        },
        formatter: function(options) {
          return winston.config.colorize(options.level, options.timestamp()) +' '+ winston.config.colorize(options.level, options.level.toUpperCase()) +' '+ (undefined !== options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
        }
      }),
      new winston.transports.File({ filename: "logs.log" })
    ]
  });
};
