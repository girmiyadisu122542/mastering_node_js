const mongoose = require('mongoose');
const request = require('supertest');
const { Genre } = require('../../models/genres');
const { User } = require('../../models/user');
let server;

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../vidly'); });
    afterEach(async() => { 
        await server.close(); 
        await Genre.deleteMany({}); 
        // await mongoose.connection.close();
    });
    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                { name: 'Genre1' }, 
                { name: 'Genre2'}
            ]);
     
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'Genre1')).toBeTruthy();
        });
    });

    describe('GET /:id', ()=>{
        it('should return genre if a vaild id is passed', async () =>{
            const genre = new Genre({name: 'Genre3'});
            await genre.save();
            const res = await request(server).get('/api/genres/' + genre._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });
        it('should return 404 if a invaild id is passed', async () =>{

            const res = await request(server).get('/api/genres/1');
            expect(res.status).toBe(404);
         });
        it('should return 404 if no genre with the given id', async () =>{
           const id = new mongoose.Types.ObjectId();
            const res = await request(server).get('/api/genres/' + id);
            expect(res.status).toBe(404);
         });
      
    });
    describe('Post /', ()=>{
        // refactoring the testing code 
        let token;
        let name;

        const exec =  () => {
           return  request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({name });
        }
        beforeEach(() => {
            token = User().generateAuthToken();
            name = 'genre1';
        });
        it('should return 401 if a user not logged in', async () =>{
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
         });
        it('should return 400 if a genre is less than 5 characters', async () =>{
            name = '1234';
            const res = await exec();              
            expect(res.status).toBe(400);
         });
        it('should return 400 if a genre greater than 20 characters', async () =>{
            name = new Array(22).join('a');
            const res = await exec();
            
            expect(res.status).toBe(400);
         });
        it('should save the genre to the database if it is valid', async () =>{
            await exec();
            const genre = Genre.find({name : 'genre1'});
            expect(genre).not.toBeNull();
         });
        it('should return the genre if it is valid', async () =>{
            const res = await exec();
            
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
         });
    });
});