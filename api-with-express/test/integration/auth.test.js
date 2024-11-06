const request = require("supertest");
const { Genre } = require("../../models/genres");
const { User } = require("../../models/user");

let server;
describe('auth middleware', () => {
  beforeEach(() => { server = require('../../vidly')});
  afterEach( async() => { 
      await Genre.deleteMany({});
      await server.close();
  })

  let token;
  const exec = () => {
    return request(server)
    .post('/api/genres')
    .set('x-auth-token', token)
    .send({name: 'genre1'});
  }
  beforeEach(() => {
    token  = User().generateAuthToken();
  });
  it('should  return 401 if the token is not privided', async () =>{
     token = '';
     const res = await exec();
     expect(res.status).toBe(401);
  });
  it('should  return 400 if the token is Invalid', async () =>{
     token = 'a';
     const res = await exec();
     expect(res.status).toBe(400);
  });
  it('should  return 200 if the token is valid', async () =>{
     const res = await exec();

     expect(res.status).toBe(200);
  });
});