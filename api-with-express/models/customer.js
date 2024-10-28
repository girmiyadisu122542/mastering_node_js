const Joi = require('joi');
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer', new mongoose.Schema({
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
    }
}));        

//validate Customer
function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(10).max(13).required(),
        isGold: Joi.boolean()
    });

    return schema.validate(customer)
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;