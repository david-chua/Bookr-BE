const db = require('../data/dbConfig.js');
const User = require("./usersModel.js");
const Books = require("./booksModel.js");


module.exports = {
  getAll,
  getBooksByUserId,
  add,
  remove
}

function getAll(){
  return db("booksOwned");
}

async function getBooksByUserId(user_id){
  const ownedBooks = await db("booksOwned").where({user_id: user_id})
  return ownedBooks;
}

async function add(input){
  await db("booksOwned").insert(input);

  const book = await db('booksOwned')
    .where({user_id: input.user_id, book_id: input.book_id})
    .first();
    return book;
}

function remove(input){
  return db("booksOwned")
    .where({input})
    .del();
}
