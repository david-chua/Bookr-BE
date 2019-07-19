const db = require('../data/dbConfig.js');

module.exports = {
 find,
 findBy,
 findById,
 add,
 edit,
};


function find() {
  return db('users').select('id', 'username', 'first_name', 'last_name','password');
}

function findBy(filter){
  return db('users').where(filter);
};

async function add(user){
  const [id] = await db('users').insert(user, "id");
  return findById(id);
}

function findById(id){
  return db('users')
    .where({ id })
    .first()
}

async function edit(id, changes){
  await db('users')
  .where('id', id)
  .update(changes)

  return findById(id);
}
