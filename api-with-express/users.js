const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express')
const users = require('./routes/users');

const auth = require('./routes/auth');
const app = express();

// if (!config.get('jwtPrivateKey')) {
//     console.error('FATAL ERROR: jwtPrivateKey is not defined.');
//     process.exit(1);
// }
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);

mongoose.connect('mongodb://localhost/project')
        .then(() => console.log('Connected to MongoDb...'))
        .catch(err => console.log('Could not connect to the db'));
//landing page
app.get('/', (req, res) => res.send(`<h1 style='text-align:center;'>Landing Page</h1 style=>`));



const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening at port ${port}...`));

