const Joi = require('joi');
const express = require('express');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { Rental } = require('../models/rental');
const router = express.Router();
const { Movie } = require('../models/movies');


router.post('/', [auth, validate(validateReturn)], async (req, res) => {
     const rental  = await Rental.lookup(req.body.customerId, req.body.movieId);
     
    if (!rental) return res.status(404).send('Rental not found!');

    if (rental.dateReturned) return res.status(400).send('Return already procced');

    rental.return();
    await rental.save();

    await Movie.findByIdAndUpdate(rental.movie._id, {
        $inc: { numberInStock: 1 }
    })

    return res.status(200).send(rental);
});

function validateReturn(req) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });

    return schema.validate(req)
}


module.exports = router;
