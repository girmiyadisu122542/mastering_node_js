const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movies');
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// list of rentals
router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals)
});

//get single rental
router.get('/:id', async (req, res) => {
    const rental = await Rental.find({ _id: req.params.id });
    if (!rental) return res.status(404).send('Rental Not Found!');
    res.send(rental);
});
//create genere
router.post('', async (req, res) => {

    const { error } = validate(req.body);
     if(!mongoose.Types.ObjectId.isValid(req.body.customerId)) return res.status(400).send('Invalid Customer');

    if (error) return res.status(400).send(error.details[0].message);
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid Customer.')

    const movie = await Movie.findById(req.body.movieId)
    if (!movie) return res.status(400).send('Invalid Movie');
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        },

    });
    rental = await rental.save();
    movie.numberInStock--;
    movie.save();
    res.send(rental);

})
//update rental

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customer = await Customer.findById(req.body.genreId);
    if (!customer) return res.status(400).send('Invalid Customer');
    
    const movie = await Movie.findById(req.body.movieId)
    if (!movie) return res.status(400).send('Invalid Movie');
    const rental = await Rental.findByIdAndUpdate(req.params.id, {
        $set: {
            customer: {
                _id: customer._id,
                name: customer.name,
                isGold: customer.isGold,
                phone: customer.phone
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate,
            },
    
            dateOut: req.body.dateOut,
            dateReturned: req.body.dateReturned,
            rentalFee: req.body.rentalFee
        }
    }, { new: true });
    if (!rental) return res.status(404).send('Rental Not Found!');
    res.send(rental);
});
//delete rental
router.delete('/:id', async (req, res) => {
    const rental = await Rental.findByIdAndDelete(req.params.id);
    if (!rental) return res.status(404).send('Rental Not Found!');
    res.send(rental);
});
//search



module.exports = router;


