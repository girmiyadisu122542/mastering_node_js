const Joi = require('joi');
const express = require('express')
const customers = require('./routes/customer');
const app = express();

app.use(express.json());
app.use('/api/customers', customers);


//landing page
app.get('/', (req, res) => res.send(`<h1 style='text-align:center;'>Customer Page</h1 style=>`));



const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening at port ${port}...`));

