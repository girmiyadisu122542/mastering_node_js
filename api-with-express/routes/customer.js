const {Customer, validate } = require('../models/customer')
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


// list of Customers
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort({name: 1});
    res.send(customers) 
});

//get single Customer
router.get('/:id', async (req, res) => {
    const customer = await Customer.find({_id: req.params.id});
    if (!customer) return res.status(404).send('Customer Not Found!');
    res.send(customer);
});
//create genere
router.post('', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
     let customer =  new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold 
     });
      customer = await customer.save(); 
      res.send(customer);

})
//update Customer

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        }
    }, { new: true});
    if (!customer) return res.status(404).send('Customer Not Found!');
    res.send(customer);
});
//delete Customer
router.delete('/:id', async (req, res) => {
    const customer =await Customer.findByIdAndDelete(req.params.id);
    if(!customer) return res.status(404).send('Customer Not Found!');
    res.send(customer);
});
//search




module.exports = router;



