
// const fs = require('node:fs');

// const files = fs.readdirSync('./');
// console.log(files);

//   fs.readdir('./', function(err, files) {
//      if(err) console.log('Eroro', err);
//      console.log('Result' ,files);

//   });

// const EventEmitter = require('node:events');

// const Logger = require('./logger')

// const logger = new Logger();

// //Register a listener
// logger.on('messageLogged', (args) => console.log('Message Emitted', args));

// logger.log("message")

const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url == '/'){
        res.write('Hello World');
        res.end();
    }
    if(req.url == '/api/courses') {
        res.write(JSON.stringify(['Maths', 'English', 'Physics']));
        res.end();
    }
});

// server.on('connection', (socket) => console.log('New Connection'));

server.listen(3000);

console.log('Listening at port 3000');



