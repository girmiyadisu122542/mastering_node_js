
const fs = require('fs');

setTimeout(() => console.log('First Event'));
setImmediate(() => console.log('Second event'));

fs.readFile('./test-file.txt', (e, d) =>{
    console.log('File Readed');
    });
console.log('Third event');

