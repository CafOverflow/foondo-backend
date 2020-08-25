const request = require('supertest');
const app = require('../testServer');

describe('Unauthenticated user', () => {
  it('should not access protected resource', async () => {
    await request(app)
      .get('/food/ingredients/autocomplete?ingredients=apple')
      .send()
      .expect(401);
  });

  it('should get JWT on login', async () => {
    const res = await request(app)
      .post('/login')
      .set('Content-type', 'application/json')
      .send({ data: { email: 'lucius@gmail.com', password: 'purr' } })
      .expect(201);
    expect(res.body.jwt).toBeDefined();
  });
});
