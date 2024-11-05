const winston = require('winston')
const mongoose = require('mongoose');

// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.simple(),
//     transports: [
//         new winston.transports.Console(),
//     ]
// });

module.exports = function() {
mongoose.connect('mongodb://localhost/project')
.then(() => console.log('Connected to MongoDb...'))
}