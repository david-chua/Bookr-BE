const db = require('../data/dbConfig.js');

module.exports = {
 find,
 findBy,
 findById,
 add,
 edit,
};


function find() {
  return db('reviews');
}

function findBy(filter){
  return db('reviews').where(filter);
};

async function add(user){
  const [id] = await db('reviews').insert(user, "id");
  return findById(id);
}

function findById(id){
  return db('reviews')
    .where({ id })
    .first()
}

async function edit(id, changes){
  await db('reviews')
  .where('id', id)
  .update(changes)

  return findById(id);
}
