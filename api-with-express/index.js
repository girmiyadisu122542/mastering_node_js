const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const authenticate  = require('./authenticate');
const express = require('express');
const app = express();

//Configuraiton
console.log("Application Name: " + config.get('name'));
console.log("Mail Server: " + config.get('mail.host'));
// console.log("Mail Password: " + config.get('mail.password'));

app.use(express.json());
app.use(express.urlencoded({extended: true})); //built in middleware
app.use(express.static('public')); //to  store static files
app.use(helmet());

console.log(app.get('env'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan Enabled...');
  }

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
    { id: 4, name: 'course4' },
];

//middleware
app.use(logger);
app.use(authenticate);
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/posts/:year/:month', (req, res) => {
    // res.send(req.params.year)
    // res.send(req.params)
    res.send(req.query)
});
//handling get request
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('course with this ID was not found!');

    res.send(course);
})

//Handling post request

app.post('/api/courses', (req, res) => {
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

app.put('/api/courses/:id', (req, res) => {
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

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id) );
    if (!course) return res.status(404).send('course with this ID was not found!');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${3000}...`));