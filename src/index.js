const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// Orders endpoint
let orders = [];
let orderIdCounter = 1;

app.get('/api/orders', (req, res) => {
  res.json({ orders, total: orders.length });
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

app.post('/api/orders', (req, res) => {
  const { customer, items, total } = req.body;
  
  if (!customer || !items || !total) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const order = {
    id: orderIdCounter++,
    customer,
    items,
    total,
    status: 'pending',
    createdAt: new Date()
  };

  orders.push(order);
  res.status(201).json(order);
});

app.put('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });

  const { status } = req.body;
  if (status) order.status = status;
  
  res.json(order);
});

app.delete('/api/orders/:id', (req, res) => {
  const index = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Order not found' });

  orders.splice(index, 1);
  res.status(204).send();
});

const server = app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});

module.exports = { app, server };
