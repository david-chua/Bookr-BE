
exports.up = function(knex, Promise) {
    return knex.schema.createTable('booksOwned', tbl =>{
      tbl
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
      tbl
        .integer('book_id')
        .unsigned()
        .references('id')
        .inTable('books')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
      tbl
        .boolean('borrowed')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('booksOwned');
};
