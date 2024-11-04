
const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const genres = require('../routes/genres');
const rental = require('../routes/rentals');
const movies = require('../routes/movies');
const customers = require('../routes/customer');
const error = require('../middleware/error')

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/rentals', rental);
    app.use('/api/movies', movies);
    app.use('/api/customers', customers);
    app.use('/api/auth', auth);
    app.use('/api/users', users);
    app.use(error);

}