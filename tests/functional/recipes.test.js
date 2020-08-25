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

describe('Recipes endpoint', () => {
  it('should return recipe for milk', async () => {
    const response = await request(app)
      .get('/recipes?ingredients=milk')
      .set('Authorization', `Bearer ${jwt}`)
      .send()
      .expect(200);
    const usedIngredients = response.body[0].usedIngredients.filter(ingredient => ingredient.name.includes('milk'));
    expect(usedIngredients.length).toBeGreaterThan(0);
  });
});

describe('Recipes complexsearch endpoint', () => {
  it('should return recipe diets', async () => {
    const response = await request(app)
      .get('/recipes/complexSearch?diet=glute free,dairy free')
      .set('Authorization', `Bearer ${jwt}`)
      .send()
      .expect(200);
    expect(response.body[0].diets).toEqual(expect.arrayContaining(['gluten free', 'dairy free']));
  });
});
