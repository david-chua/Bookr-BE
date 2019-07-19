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


server.get('/all', authenticate, (req,res) => {
  Books.find()
    .then(data => {
      res.status(200).json({books: data })
    })
    .catch(err => {
      return errorHelper(400, 'Unable to get data')
    })
});


module.exports = server;
