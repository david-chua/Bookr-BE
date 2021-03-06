
exports.up = function(knex, Promise) {
    return knex.schema.createTable('booksRead', tbl =>{
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
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('booksRead');
};
