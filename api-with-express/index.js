const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const authenticate  = require('./middleware/authenticate');
const express = require('express');
const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express();

//Configuraiton
console.log("Application Name: " + config.get('name'));
console.log("Mail Server: " + config.get('mail.host'));
console.log("Mail Password: " + config.get('mail.password'));

app.set('view engine', 'pug');
app.set('views', './views')

app.use(express.json());
app.use(express.urlencoded({extended: true})); //built in middleware
app.use(express.static('public')); //to  store static files
app.use(helmet());
app.use('/api/courses',courses);
app.use('/', home);
console.log(app.get('env'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
   startupDebugger('Morgan Enabled...');
  }

  dbDebugger('connected to the database...');


//middleware
app.use(logger);
app.use(authenticate);

app.get('/api/posts/:year/:month', (req, res) => {
    // res.send(req.params.year)
    // res.send(req.params)
    res.send(req.query)
});
//handling get request




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${3000}...`));