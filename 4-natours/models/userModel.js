const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter your name.']
    },
    email: {
        type: String,
        required: [true, 'Enter your email'],
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email.']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Enter your password'],
        minlength: 8,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        //This only works on CREATE and SAVE
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Passwords are not the same'
        }
    }
});

userSchema.pre('save', async function (next) {
    //Only run this function if password was actually modefied   
    if (!this.isModified('password')) return next();

    //Hashing password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    //Delting the passwordConfirm field
    this.passwordConfirm = undefined;

});
const User = mongoose.model('User', userSchema);

module.exports = User;