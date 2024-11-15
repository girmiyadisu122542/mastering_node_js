const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
    constructor() {
        super();
    }
}


const myEmitter = new Sales;

myEmitter.on('newSale', () => {
    console.log('There was a new sale');
});

myEmitter.on('newSale', () => {
    console.log('Customer Name: Girmay');
});

myEmitter.on('newSale', stock => {
    console.log(`There are ${stock} in the store left`);
});

myEmitter.emit('newSale', 9);

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request recieved!');
  res.end('Request recieved');
});

server.on('request', (req, res) => {
    console.log('2nd request recieved');
    
});
server.on('close', (req, res) => {
    console.log('server closed');
});

server.listen(8000, '127.0.0.1', () =>{
    console.log('waiting for request');
});

