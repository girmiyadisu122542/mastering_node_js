const express = require('express')
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();
require('./startup/prod')(app);

//landing page
app.get('/', (req, res) => res.send(`<h1 style='text-align:center;'>Landing Page</h1 style=>`));

const port = process.env.PORT || 3000;
const server = app.listen(port, console.log(`Listening at port ${port}...`));

module.exports = server;

