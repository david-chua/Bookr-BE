const db = require('../data/dbConfig.js');

module.exports = {
 find,
 findBy,
 findById,
 add,
 edit,
 findReviewsByBookId
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

function findReviewsByBookId(id){
  return db('reviews')
      .leftJoin('users', 'users.id', 'reviews.user_id')
      .leftJoin('books', 'books.id', 'reviews.book_id')
      .where('reviews.book_id', id)
}

async function add(review){
  const [id] = await db('reviews').insert(review, "id");
  return findById(id);
}



async function edit(id, changes){
  await db('reviews')
  .where('id', id)
  .update(changes)

  return findById(id);
}
