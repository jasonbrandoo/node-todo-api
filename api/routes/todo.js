const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const Todo = require('../models/todo');

route.get('/', (req, res, next) => {
  Todo.find()
    .then(result => {
      console.log(result);
      const response = {
        total: result.length,
        data: result.map(doc => {
          return {
            id: doc._id,
            name: doc.name,
            request: {
              type: 'GET',
              url: `http://localhost:3000/todo/${doc._id}`
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

route.post('/', (req, res, next) => {
  const todo = new Todo({
    name: req.body.name
  });
  todo
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        messages: 'Successfully created',
        data: {
          name: result.name,
          request: {
            type: 'GET',
            url: `http://localhost:3000/todo/${result._id}`
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

route.get('/:todoId', (req, res, next) => {
  const id = req.params.todoId;
  Todo.findById(id)
    .then(result => {
      console.log(result);
      if (result) {
        res.status(200).json({
          id: result._id,
          item: result.name,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/todo'
          }
        });
      } else {
        res.status(404).json({
          message: 'Data not found'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

route.patch('/:todoId', (req, res, next) => {
  const id = req.params.todoId;
  const item = {};
  item.name = req.body.name;
  Todo.update({ _id: id }, item)
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Updated',
        request: {
          type: 'GET',
          url: `http://localhost:3000/todo/${id}`
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

route.delete('/:todoId', (req, res, next) => {
  const id = req.params.todoId;
  Todo.remove({ _id: id })
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/todo'
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = route;
