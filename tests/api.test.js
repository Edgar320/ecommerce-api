const request = require('supertest');
const { app, server } = require('../src/index');

describe('Orders API', () => {
  afterAll(() => {
    server.close();
  });

  test('GET /health should return healthy status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
  });

  test('POST /api/orders should create a new order', async () => {
    const newOrder = {
      customer: 'John Doe',
      items: [{ product: 'Laptop', quantity: 1 }],
      total: 999.99
    };

    const response = await request(app)
      .post('/api/orders')
      .send(newOrder);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.customer).toBe('John Doe');
  });

  test('GET /api/orders should return all orders', async () => {
    const response = await request(app).get('/api/orders');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('orders');
  });
});
