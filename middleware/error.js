const { transports, format, createLogger } = require('winston');

module.exports = function(err, req, res, next) {

  //Logging Level Priority
  // error
  // warn
  // info
  // verbose
  // debug
  // silly
  
  const logger = createLogger({
    level: 'error',
    format: format.combine(
      format.timestamp(),
      format.colorize(),
      format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: "erros.log" })
    ]
  });

  logger.error(err.message, err);

  res.status(500).send("Something failed.");
};
