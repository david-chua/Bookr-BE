const express = require('express');
const axios = require('axios');

const Users = require('./../../models/usersModel.js');
const Books = require('./../../models/booksModel.js');
const Reviews = require('./../../models/reviewsModel.js');

const db = require('./../../data/dbConfig.js');
const { authenticate } = require('./../../auth/authenticate.js');

const server = express.Router();


const errorHelper = (status, message, res) => {
  res.status(status).json({err: message })
};


server.get('/', authenticate, (req,res) => {
  Books.find()
    .then(books => {
      res.status(200).json({books: book })
    })
    .catch(err => {
      return errorHelper(400, 'Unable to get data')
    })
});

server.get('/:id', authenticate, (req,res) => {
  Books.findById(req.params.id)
    .then(response => {
      console.log('books stuff', response)
    })
    .catch(error => {
      return errorHelper(500, 'Internal Server Error');
    })
})

module.exports = server;
