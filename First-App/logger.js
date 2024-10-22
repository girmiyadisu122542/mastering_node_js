
// console.log(__filename);
// console.log(__dirname);

const EventEmitter = require('node:events');
const emitter =  new EventEmitter();
const url = "https://www.my-wesbtie.com/";
class Logger extends EventEmitter {

   log(message) {
        console.log(message);

        //Raised and event
    this.emit('messageLogged', { id: 1, url: 'https://'});
    }

}

module.exports = Logger;
