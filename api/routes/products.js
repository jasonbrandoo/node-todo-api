const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

route.get('/', (req, res, next) => {
  res.status(200).json({
    messages: 'Products GET'
  });
});

route.post('/', (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  });

  product
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        messages: 'Products POST',
        product: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

route.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .then(result => {
      console.log(result);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: 'Data not found'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

route.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    messages: 'Products PATCH',
    id: req.params.productId
  });
});

route.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    messages: 'Products PATCH',
    id: req.params.productId
  });
});

module.exports = route;
