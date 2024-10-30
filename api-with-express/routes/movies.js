const { Movie, validate } = require('../models/movies');
const { Genre } = require('../models/genres');
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// list of movies
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort({ name: 1 });
    res.send(movies)
});

//get single movie
router.get('/:id', async (req, res) => {
    const movie = await Movie.find({ _id: req.params.id });
    if (!movie) return res.status(404).send('Movie Not Found!');
    res.send(movie);
});
//create genere
router.post('', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid Genre.')
    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    res.send(movie);

})
//update movie

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid Genre');
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }
    }, { new: true });
    if (!movie) return res.status(404).send('Movie Not Found!');
    res.send(movie);
});
//delete movie
router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).send('Movie Not Found!');
    res.send(movie);
});
//search



module.exports = router;


