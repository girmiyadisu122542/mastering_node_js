const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express')
const movies = require('./routes/movies');
const app = express();

app.use(express.json());
app.use('/api/movies', movies);

mongoose.connect('mongodb://localhost/project')
        .then(() => console.log('Connected to MongoDb...'))
        .catch(err => console.log('Could not connect to the db'));
//landing page
app.get('/', (req, res) => res.send(`<h1 style='text-align:center;'>Landing Page</h1 style=>`));



const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening at port ${port}...`));

