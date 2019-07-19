const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');

const authenticateRouter = require('./routes/authenticationRouter.js');
const booksRouter = require('./routes/booksrouter');
const reviewsRouter = require('./routes/reviewsRouter');

const server = express();

server.use(helmet());
server.use(logger('dev'));
server.use(cors());
server.use(express.json());

server.use('/authentication', authenticateRouter);
server.use('/books', booksRouter);
server.use('/reviews', reviewsRouter);


server.get('/', async(req, res) => {
  res.status(200).json({message: 'Welcome to Bookr'});
});


module.exports = server;
