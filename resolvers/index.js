const GMR = require("graphql-merge-resolvers");

const usersResolvers = require("./userResolvers");
const booksResolvers = require("./booksResolvers");
const reviewsResolvers = require("./reviewsResolvers");
const booksOwnedResolvers = require("./bookOwnedResolvers");
const favoriteBooksResolvers = require("./favoriteBooksResolvers");
const booksReadResolvers = require("./bookReadResolvers");
const bookBorrowedResolvers = require("./bookBorrowedResolvers");

module.exports = GMR.merge([
  usersResolvers,
  booksResolvers,
  reviewsResolvers,
  booksOwnedResolvers,
  favoriteBooksResolvers,
  booksReadResolvers,
  bookBorrowedResolvers
]);
