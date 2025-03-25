const winston = require('winston')

// Define log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// confiure the logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        logFormat
    ),
    transports: [
        new winston.transports.Console(), //Log to console
        // new winston.transports.File({filename: 'logs/app.log'}) // log to file
    ]
})

module.exports =  {
    /**
     * Logs the start of a method execution.
     * @param {string} className - Name of the class/module.
     * @param {string} methodName - Name of the method.
     */
    startLog: (className, methodName) => {
      logger.info(`******* ${className} ******* ${methodName} ******* START *******`);
    },
  
    /**
     * Logs the end of a method execution.
     * @param {string} className - Name of the class/module.
     * @param {string} methodName - Name of the method.
     */
    endLog: (className, methodName) => {
      logger.info(`******* ${className} ******* ${methodName} ******* END *******`);
    },
  
    /**
     * Logs an error message.
     * @param {string} name - Name of the error.
     * @param {string} value - Error details.
     */
    errorMessage: (name, value) => {
      logger.error(`Error Message :: Name --> ${name} :: Value: ${value}`);
    },
  
    /**
     * Logs a stack trace for exceptions.
     * @param {Error} error - Exception object.
     */
    logStackTrace: (error) => {
      logger.error(`Error Message :: Class Name --> ${error.constructor.name} :: Exception: ${error.stack}`);
    },
  
    /**
     * Logs an informational message.
     * @param {string} message - The message to log.
     */
    logInfoMessage: (message) => {
      logger.info(`Info Message :: Name --> ${message}`);
    },
  
    /**
     * Logs request payload details.
     * @param {string} url - Request URL.
     * @param {string} payload - Request payload.
     */
    logPayload: (url, payload) => {
      logger.info(`Info Message:: \nURL --> [ ${url} ], \npayload --> [ ${payload} ]`);
    }
  };