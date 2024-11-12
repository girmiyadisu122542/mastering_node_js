const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');
///////////////////////////////////
//FILES
//Blocking or Synchronous code
/*
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);
const textOut = `This is all you know to be about avacado : ${textIn} \n created on : ${Date.now().toString()} `
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written ');


//Non-blocking or Asyncronous code

fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                console.log('Your final file is written😂');
            });
        });
    });
});

console.log('will read File...');
*/
///////////////////////////////
//SERVER


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);


const server = http.createServer((req, res) => {
    const { query, pathName } = url.parse(req.url, true);
    const pathUrl = req.url;
    if (pathUrl === '/' || pathUrl === '/overview') {
        res.writeHead(200, { 'content-type': 'text/html' })

        const cardHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace(/{%PRODUCTCARDS%}/, cardHtml)
        res.end(output);
    }
    else if (pathUrl === '/product') {
        res.writeHead(200, { 'content-type': 'text/html'});
        const product =dataObject[query.id];
        const output = replaceTemplate(tempProduct,product)
        res.end(output);
    }
    else if (pathUrl === '/api') {
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(data);

    }
    else {
        res.writeHead(404, '<h1>Page Not Found!</h1>', { 'content-type': 'text/html' });


    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening at port 8000....');

})




