const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//authentcated user
router.get('/me', auth,  async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    return res.send(user);
});
// list of users
router.get('/', async (req, res) => {
    const users = await User.find().sort({name: 1});
    res.send(users) 
});

//get single user
router.get('/:id', async (req, res) => {
    const user = await User.find({_id: req.params.id});
    if (!user) return res.status(404).send('User Not Found!');
    res.send(user);
});
//create genere
router.post('', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registered!');
      user =  new User(_.pick(req.body, ['name', 'email', 'password']));
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      user = await user.save(); 

      token = user.generateAuthToken();
      res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email']));

})


module.exports = router;
