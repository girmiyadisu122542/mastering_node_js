const auth = require('../middleware/auth');
const admin =require('../middleware/admin');
const { Genre, validate } = require('../models/genres');
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middleware/async');
// list of genres

 
router.get('/', auth, asyncMiddleware(async (req, res, next) => {
        const genres = await Genre.find().sort({name: 1});
        res.send(genres);
   }));

//get single genre
router.get('/:id', auth, asyncMiddleware(async (req, res) => {
    const genre = await Genre.find({_id: req.params.id});
    if (!genre) return res.status(404).send('Genre Not Found!');
    res.send(genre);
}));
//create genere
router.post('', auth, auth, asyncMiddleware(async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
     let genre =  new Genre({
        name: req.body.name 
     });
      genre = await genre.save(); 
      res.send(genre);

}));
//update genre

router.put('/:id', auth, asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name
        }
    }, { new: true});
    if (!genre) return res.status(404).send('Genre Not Found!');
    res.send(genre);
}));
//delete genre
router.delete('/:id', [auth, admin], asyncMiddleware(async (req, res) => {
    const genre =await Genre.findByIdAndDelete(req.params.id);
    if(!genre) return res.status(404).send('Genre Not Found!');
    res.send(genre);
}));
//search



module.exports = router;




// // With out MongoDb


// // list of genres
// router.get('/', (req, res) => res.send(genres));

// //get single genre
// router.get('/:id', (req, res) => {
//     const genre = genres.find(g => g.id === parseInt(req.params.id));
//     if (!genre) return res.status(404).send('Genre Not Found!');
//     res.send(genre);
// });
// //create genere
// router.post('', (req, res) => {

//     const { error } = validateGenre(req.body);
//     if (error) return res.status(400).send(error.details[0].message);
//     const genre = {
//         id: genres.length + 1,
//         name: req.body.name
//     };

//     genres.push(genre);
//     res.send(genre);

// })
// //update genre

// router.put('/:id', (req, res) => {
//     const genre = genres.find(g => g.id == parseInt(req.params.id));
//     if (!genre) return res.status(404).send('Genre Not Found!');

//     const { error } = validateGenre(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     genre.name = req.body.name;
//     res.send(genre);
// });
// //delete genre
// router.delete('/:id', (req, res) => {
//     const genre = genres.find(g => g.id === parseInt(req.params.id));
//     if(!genre) return res.status(404).send('Genre Not Found!');
    
//     const index = genres.indexOf(genre);
//     genres.splice(index, 1);

//     res.send(genre);
// });
// //search

// //validate genre

// function validateGenre(genre) {
//     const schema = Joi.object({
//         name: Joi.string().min(3).required()
//     });

//     return schema.validate(genre)
// }


// module.exports = router;