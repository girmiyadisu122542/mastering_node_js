const Joi = require('joi');
const express = require('express')
const genres = require('./routes/genres');
const app = express();

app.use(express.json());
app.use('/api/genres', genres);


//landing page
app.get('/', (req, res) => res.send(`<h1 style='text-align:center;'>Landing Page</h1 style=>`));



const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening at port ${port}...`));

