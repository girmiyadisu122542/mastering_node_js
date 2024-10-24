const express = require('express');

const router = express.Router();

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
    { id: 4, name: 'course4' },
];
router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('course with this ID was not found!');

    res.send(course);
})

//Handling post request

router.post('', (req, res) => {
    //input validation
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

// handling http put request

router.put('/:id', (req, res) => {
    //checking course existance
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('course with this ID was not found!');


    // is validated
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
       

    course.name = req.body.name;
    res.send(course);
});


function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}


//delete 

router.delete('/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id) );
    if (!course) return res.status(404).send('course with this ID was not found!');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})

module.exports = router;