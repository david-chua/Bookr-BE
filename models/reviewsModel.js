const db = require('../data/dbConfig.js');

module.exports = {
 find,
 findBy,
 findById,
 add,
 edit,
 findReviewsByReviewID,
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

function findReviewsByReviewID(id){
  return db('reviews')
      .leftJoin('users', 'users.id', 'reviews.user_id')
      .leftJoin('books', 'books.id', 'reviews.book_id')
      .where('reviews.id', id)
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
