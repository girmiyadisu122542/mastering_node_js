const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//create genere
router.post('', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid password or email!');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid password or email!');

    token = user.generateAuthToken();
    res.send(token);

})


   function validate(req) {
    const schema = Joi.object({
       email: Joi.string().required(),
       password: Joi.required()
    });
    
    return schema.validate(req)
    }
    
module.exports = router;
