const Joi = require('joi');
const mongoose = require('mongoose');
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
       type: String,
       require: true,
       minlength: 3,
       maxlength: 20
    }
}));        

//validate genre

function validateGenre(genre) {
const schema = Joi.object({
   name: Joi.string().min(3).required()
});

return schema.validate(genre)
}

module.exports.Genre = Genre;
module.exports.validate = validateGenre;
