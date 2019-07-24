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
  return db("favoriteBooks");
}

async function getBooksByUserId(user_id){
  const favoriteBooks = await db("favoriteBooks").where({user_id: user_id})
  return favoriteBooks;
}

async function add(input){
  await db("favoriteBooks").insert(input);

  const book = await db('favoriteBooks')
    .where({user_id: input.user_id, book_id: input.book_id})
    .first();
    return book;
}

function remove(input){
  return db("favoriteBooks")
    .where(input)
    .del();
}
