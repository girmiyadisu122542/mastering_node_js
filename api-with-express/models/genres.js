const Joi = require('joi');
const mongoose = require('mongoose');
const genreSchema = new mongoose.Schema({
   name: {
      type: String,
      require: true,
      minlength: 3,
      maxlength: 20
   }
});
const Genre = mongoose.model('Genre', genreSchema);        

//validate genre

function validateGenre(genre) {
const schema = Joi.object({
   name: Joi.string().min(3).required()
});

return schema.validate(genre)
}

module.exports.Genre = Genre;
module.exports.validate = validateGenre;
module.exports.genreSchema = genreSchema;
