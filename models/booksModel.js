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

async function add(book){
  const [id] = await db('books').insert(book, "id");
  return findById(id);
}

function findById(id){
  return db('books')
    .where({ id })
    .first()
}

async function edit(id, changes){
  await db('books')
  .where('id', id)
  .update(changes)

  return findById(id);
}
