
exports.up = function(knex, Promise) {
    return knex.schema.createTable('booksBorrowed', tbl =>{
      tbl
        .integer('borrower')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
      tbl
        .integer('owner')
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
        .boolean('lost')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('booksBorrowed');
};
