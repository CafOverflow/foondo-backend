const request = require('supertest');
const app = require('../testServer');

let jwt = null;

beforeAll(done => {
  request(app)
    .post('/login')
    .set('Content-type', 'application/json')
    .send({ data: { email: 'lucius@gmail.com', password: 'purr' } })
    .end((err, response) => {
      jwt = response.body.jwt; // save the token!
      done();
    });
});

describe('Ingredients endpoint', () => {
  it('should return 200', async () => {
    const response = await request(app)
      .get('/food/ingredients/autocomplete?query=apple')
      .set('Authorization', `Bearer ${jwt}`)
      .send()
      .expect(200);

    expect(response).toHaveProperty(['body', 0, 'name'], 'apple');
  });
});
