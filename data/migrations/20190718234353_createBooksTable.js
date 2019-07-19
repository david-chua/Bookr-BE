
exports.up = function(knex, Promise) {
    return knex.schema.createTable('books', tbl =>{
        tbl.increments();
        tbl.string('title').notNullable();
        tbl.string('author')
        tbl.string('publisher')
        tbl.string('image')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('books');
};
