const db = require('../data/dbConfig.js');

module.exports = {
 find,
 findBy,
 findById,
 add,
 edit,
};


function find() {
  return db('books').select('id', 'title', 'author', 'publisher', 'image');
}

function findBy(filter){
  return db('books').where(filter);
};

function findById(id){
  return db('books')
    .leftJoin('reviews', 'reviews.book_id', 'books.id')
    .where( 'books.id', id )
}

async function add(book){
  const [id] = await db('books').insert(book, "id");
  return findById(id);
}

async function edit(id, changes){
  await db('books')
  .where('id', id)
  .update(changes)

  return findById(id);
}
