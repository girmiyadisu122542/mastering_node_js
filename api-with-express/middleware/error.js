const winston = require('winston');
 require('winston-mongodb');
module.exports = function (err, req, res, next) {
    const logger = winston.createLogger({
        level: 'error',
        transports: [
            new winston.transports.File({ filename: 'error_file.log' }),
            new winston.transports.MongoDB({ db: 'mongodb://localhost/project' })
        ]
    });
    logger.error(err.message, err);
    res.sendStatus(500).send('Something went wrong!');
}