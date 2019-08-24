const winston = require("winston");

const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: "logfile.log" })],

  exceptionHandlers: [
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true
    }),
    new winston.transports.File({ filename: "exceptions.log" })
  ]
});

process.on("unhandledRejection", ex => {
  throw ex;
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

module.exports = logger;
