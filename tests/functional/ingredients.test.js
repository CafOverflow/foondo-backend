const request = require('supertest');
const app = require('../testServer');

let server;

beforeAll(() => {
  server = app.listen(3002);
});

afterAll(() => {
  server.close();
});

describe('Ingredients endpoint', () => {
  it('should return 200', async () => {
    const res = await request(server)
      .get('/food/ingredients/autocomplete?ingredients=apple')
      .send();
    expect(res.statusCode).toEqual(401); // forbidden
  });
});
