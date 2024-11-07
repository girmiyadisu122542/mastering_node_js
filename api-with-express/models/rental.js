const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const moment = require('moment');

const RentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                require: true,
                minlength: 3,
                maxlength: 20
            },
            phone: {
                type: String,
                required: true,
                minlength: 10,
                maxlength: 13

            },
            isGold: {
                type: Boolean,
                default: false
            },
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                require: true,
                minlength: 5,
                trim: true,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                min: 0,
                max: 255,
                required: true
            },
        }),

        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },

    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

RentalSchema.statics.lookup = function (customerId, movieId) {
  return  this.findOne({
        'customer._id': customerId,
        'movie._id': movieId
    });
}

RentalSchema.methods.return = function() {
    this.dateReturned = new Date();

    const rentalDays = moment().diff(this.dateOut, 'days');
    this.rentalFee = rentalDays * this.movie.dailyRentalRate
}
const Rental = mongoose.model('Rental', RentalSchema);

//validate Movie

function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    });

    return schema.validate(rental)
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;

