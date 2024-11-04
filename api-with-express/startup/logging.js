require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
    process.on('uncaughtException', (ex) => {
        const logger = winston.createLogger({
            level: 'error',
            transports: [
                new winston.transports.File({ filename: 'error_file.log' }),
                new winston.transports.MongoDB({ db: 'mongodb://localhost/project' })
            ]
        });
        logger.error(ex.message, ex);
    });
    process.on('unhandledRejection', (ex) => {
        const logger = winston.createLogger({
            level: 'error',
            transports: [
                new winston.transports.File({ filename: 'error_file.log' }),
                new winston.transports.MongoDB({ db: 'mongodb://localhost/project' })
            ]
        });
        logger.error(ex.message, ex);
    });


}