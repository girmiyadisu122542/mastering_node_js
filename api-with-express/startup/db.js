const winston = require('winston')
const mongoose = require('mongoose');
const config = require('config');
// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.simple(),
//     transports: [
//         new winston.transports.Console(),
//     ]
// });

module.exports = function() {
const db = config.get('db');
mongoose.connect(db)
.then(() => console.log(`Connected to ${db}...`))
}