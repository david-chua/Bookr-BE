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
  return db("booksRead");
}

async function getBooksByUserId(user_id){
  const readBooks = await db("booksRead").where({user_id: user_id})
  return readBooks;
}

async function add(input){
  await db("booksRead").insert(input);

  const books = await db('booksRead')
    .where({user_id: input.user_id, book_id: input.book_id})
    .first();
    return books;
}

function remove(input){
  return db("booksRead")
    .where(input)
    .del();
}
