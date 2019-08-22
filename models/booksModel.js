const db = require('../data/dbConfig.js');

module.exports = {
 find,
 findBy,
 findById,
 add,
 edit,
 remove
};


function find() {
  return db('books');
}

function findBy(filter){
  return db('books').where(filter);
};

function findById(id){
  return db('books')
    .where({ id })
    .first()
}

async function add(book){
  console.log(book)
  const [id] = await db('books').insert(book, "id");
  return findById(id);
}

async function edit(id, changes){
  await db('books')
  .where('id', id)
  .update(changes)

  return findById(id);
}

function remove(id){
  db("books")
  .where({id: id})
  .del();
}
