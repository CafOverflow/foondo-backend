const client = require('../../src/client/spoonacularClient');

describe('Test spoonacular client', () => {
  it('should return valid response', async () => {
    const path = 'recipes/findByIngredients';
    const query = 'number=1&ranking=1&ingredients=potato';
    const response = await client.get(path, query);
    expect(response).toHaveProperty(['body', 0, 'id'], 885310);
    expect(response).toHaveProperty('status', 200);
  });
});
