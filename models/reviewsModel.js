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
  return db('reviews');
}

function findBy(filter){
  return db('reviews').where(filter);
};

function findById(id){
  return db('reviews')
    .where({ id })
    .first()
}

async function add(review){
  const [id] = await db('reviews').insert(review, "id");
  return findById(id);
}

function remove(id){
  return db('reviews')
  .where('id', id)
  .del()
}

async function edit(id, changes){
  await db('reviews')
  .where('id', id)
  .update(changes)

  return findById(id);
}
