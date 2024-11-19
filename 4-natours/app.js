const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1. MIDDLEWARE
app.use(morgan('dev'));

app.use(express.json());  // middleware
app.use((req, res, next) => {
    console.log('Hello From the middleware 👌');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// 2. ROUTE HANDLERS

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours: tours
        }
    });
}

const getTour = (req, res) => {

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Tour not found!'
        });
    }

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
            tour
        }
    });
}

const createTour = (req, res) => {
    console.log(req.body);
    const newId = (tours.length - 1) + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
}

const updateTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Tour not found!'
        });
    }

    res.status(200).json({
        status: 'success',
        data: "<Updated Tour Here>"
    });
}

const deleteTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Tour not found!'
        });
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
}
const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const getUser = (req, res) => {

    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

// 3. ROUTES

const tourRouter = express.Router();
const userRouter = express.Router();

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);


//4. SERVER
const port = 3000;
app.listen(port, () => {
    console.log(`App Listening at port ${port}...`);
});