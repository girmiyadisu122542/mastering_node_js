const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
   name: {
      type: String,
      require: true,
      minlength: 5,
      maxlength: 20
   },
   email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
   },
   password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
   },
   isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
   const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, 'jwtPrivateKey');
   return token;
}
const User = mongoose.model('User', userSchema);        

//validate user

function validateUser(user) {
const schema = Joi.object({
   name: Joi.string().min(5).required(),
   email: Joi.string().min(5).email().required(),
   password: Joi.string().min(6).required()
});

return schema.validate(user)
}

module.exports.User = User;
module.exports.validate = validateUser;
// module.exports.genreSchema = genreSchema;
