const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express')
const users = require('./routes/users');
const auth = require('./routes/auth');
const genres = require('./routes/genres');
const rental = require('./routes/rentals');
const movies = require('./routes/movies');
const customers = require('./routes/customer');
const error = require('./middleware/error')

const app = express();

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/rentals', rental);
app.use('/api/movies', movies);
app.use('/api/customers', customers);
app.use('/api/auth', auth);
app.use('/api/users', users);

app.use(error);

mongoose.connect('mongodb://localhost/project')
        .then(() => console.log('Connected to MongoDb...'))
        .catch(err => console.log('Could not connect to the db'));
//landing page
app.get('/', (req, res) => res.send(`<h1 style='text-align:center;'>Landing Page</h1 style=>`));



const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening at port ${port}...`));

