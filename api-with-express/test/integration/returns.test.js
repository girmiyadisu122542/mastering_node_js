const request = require('supertest');
const { Rental } = require('../../models/rental');
const mongoose = require('mongoose');
const { User } = require('../../models/user');
const moment = require('moment/moment');
const { Movie } = require('../../models/movies');

describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;
    let movie;

    const exec = () => {
        return request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId, movieId });
    }

    beforeEach(async () => {
        server = require('../../vidly');
        customerId = new mongoose.Types.ObjectId();
        movieId = new mongoose.Types.ObjectId();
        token = new User().generateAuthToken();

        movie = new Movie({
            _id: movieId,
            title:'12345',
            genre: { name: 'genre1' },
            numberInStock: 10,
            dailyRentalRate: 2
        });
        await movie.save();

        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345678910'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2
            }
        });

        await rental.save();
    });

    afterEach(async () => {
        await Rental.deleteMany();
        await Movie.deleteMany();
        await server.close();
    });

    it('should return 401 if the user is not logged in', async () => {
        token = '';
        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if customerId is not provided', async () => {
        customerId = '';
        const res = await exec();
        expect(res.status).toBe(400);
    });
    it('should return 400 if movieId is not provided', async () => {
        movieId = '';
        const res = await exec();
        expect(res.status).toBe(400);
    });
    it('should return 404 if no rental found for Customer/movie', async () => {
        await Rental.deleteMany({});
        const res = await exec();
        expect(res.status).toBe(404);
    });
    it('should return 400 if return is already proccesed', async () => {
        rental.dateReturned = new Date();
        await rental.save();
        const res = await exec();
        expect(res.status).toBe(400);
    });
    it('should return 200 if a valid request is send', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });
    it('should set dateRetruned if the inputs are valid', async () => {
        const res = await exec();

        const rentalInDb = await Rental.findById(rental._id);
        const diff = new Date() - rentalInDb.dateReturned;
        expect(diff).toBeLessThan(10 * 1000);
    });
    it('should calculate Rental fee', async () => {
        rental.dateOut = moment().add(-7, 'days').toDate();
        await rental.save();
        const res = await exec();

        const rentalInDb = await Rental.findById(rental._id);
        // const diff = rentalInDb.dateReturned - rentalInDb.dateOut;
        // const fee = diff * rentalInDb.movie.dailyRentalRate;
        expect(rentalInDb.rentalFee).toBe(14);
    });
    it('should increase number in stock of the movie', async () => {
        const res = await exec();
        const movieInDb = await Movie.findById(movieId);

        expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
    });
    it('should return rentals if the inputs are valid ', async () => {
        const res = await exec();
        const rentalInDb = await Rental.findById(rental._id);

        // expect(res.body).toBe(rentalInDb);
        expect(res.body).toHaveProperty('dateOut');
        expect(res.body).toHaveProperty('dateReturned');
        expect(res.body).toHaveProperty('rentalFee');
        expect(res.body).toHaveProperty('customer');
        expect(res.body).toHaveProperty('movie');
        expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(['dateOut', 'dateReturned','rentalFee', 'customer', 'movie' ]));
    });

});