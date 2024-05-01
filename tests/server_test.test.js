const request = require('supertest');
const app = require('../server');

test('Test request front_page', async () =>
{
  const response = await request(app)
  .get('/front_page')
  .then(response => {
    expect(response.status).toEqual(200);
  });
});
