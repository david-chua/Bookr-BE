const db = require('../data/dbConfig.js');
const User = require("./usersModel.js");
const Books = require("./booksModel.js");


module.exports = {
  getAll,
  getBooksByOwner,
  getBooksByBorrower,
  add,
  remove
}

function getAll(){
  return db("booksBorrowed");
}

async function getBooksByOwner(user_id){
  const booksBorrowed = await db("booksBorrowed").where({owner: user_id})
  return booksBorrowed
}

async function getBooksByBorrower(user_id){
  const booksBorrowed = await db("booksBorrowed").where({borrower: user_id})
  return booksBorrowed
}

async function add(input){
  await db("booksBorrowed").insert(input);

  const book = await db('booksBorrowed')
    .where({owner: input.owner, borrower: input.borrower, book_id: input.book_id})
    .first();
    return book;
}

function remove(input){
  return db("booksBorrowed")
    .where(input)
    .del();
}
