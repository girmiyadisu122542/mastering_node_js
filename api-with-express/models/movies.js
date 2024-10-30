const Joi = require('joi');
const { genreSchema } = require('./genres')
const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
   title: {
      type: String,
      require: true,
      minlength: 5,
      maxlength: 255
   },
   genre: {
    type: genreSchema,
    required: true
   },
   numberInStock: {
    type: Number,
    min: 0,
    max: 255,
    required: true

   },
   dailyRentalRate: {
    type: Number,
    min: 0,
    max: 255,
    required: true
   }
});
const Movie = mongoose.model('Movie', movieSchema);        

//validate Movie

function validateMovie(Movie) {
const schema = Joi.object({
   title: Joi.string().min(5).required(),
   genreId: Joi.string().required(),
   numberInStock: Joi.number().min(0).max(255).required(),
   dailyRentalRate: Joi.number().min(0).max(255).required()
});

return schema.validate(Movie)
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;

