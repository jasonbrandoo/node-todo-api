const express = require('express');
const route = express.Router();

route.get('/', (req, res, next) => {
  res.status(200).json({
    messages: 'order GET'
  });
});

route.post('/', (req, res, next) => {
  const order = {
    orderId: req.body.orderId,
    qty: req.body.qty
  };
  res.status(200).json({
    messages: 'order POST',
    order: order
  });
});

route.get('/:orderId', (req, res, next) => {
  res.status(200).json({
    messages: 'Order Specific',
    id: req.params.orderId
  });
});

route.delete('/:orderId', (req, res, next) => {
  res.status(200).json({
    messages: 'order PATCH',
    id: req.params.orderId
  });
});

module.exports = route;
