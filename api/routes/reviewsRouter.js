const express = require('express');
const axios = require('axios');

const Users = require('./../../models/usersModel.js');
const Books = require('./../../models/booksModel.js');
const Reviews = require('./../../models/reviewsModel.js');

const db = require('./../../data/dbConfig.js');
const { authenticate } = require('./../../auth/authenticate.js');

const server = express.Router();


const errorHelper = (status, message, res) => {
  res.status(status).json({ err: message })
}

server.post("/", authenticate, (req, res) => {
  const review = req.body.book.review;
  const book = req.body.book;
  const user_id = req.body.user_id;
  let book_id = null;

  console.log('req', req.body)

  Books
    .findBy({ "title": book.title})
    .then(response => {
        console.log(response)
        if (response.length === 0){
          Books.add({
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            image: book.image
          })
          .then(response => {
            console.log('response', response)
            book_id = response.id
            Reviews.add({
              content: review.content,
              book_id: book_id,
              user_id: user_id,
              rating: review.rating
            })
            .then(response => {
              console.log('review addition response', response)
              res.json(response)
            })
            .catch(error => {
              return errorHelper('500', 'Internal Server Error');
            })
          })
          .catch(error => {
            return errorHelper('500', 'Internal Server Error');
          })
        }
        else {
          console.log('already in the database', response);
          book_id = response[0].id
          Reviews
            .add({
              content: review.content,
               book_id: book_id,
               user_id: user_id,
               rating: review.rating
             })
             .then(response => {
               console.log('new review, old response', response);
               res.json(response);
             })
             .catch(error => {
               return errorHelper('500', 'Internal Server Error');
             })
        }
    })
    .catch(error => {
      return errorHelper('500', 'Internal Error');
    })
});



module.exports = server;
