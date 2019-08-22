
exports.up = function(knex, Promise) {
    return knex.schema.createTable('books', tbl =>{
        tbl.increments();
        tbl.string('title').notNullable();
        tbl.string('author')
        tbl.string('publisher')
        tbl.string('publish_date')
        tbl.string('image')
        tbl.string('book_api_id')
        tbl.string('category')
        tbl.text('description')
        tbl.float('list_price')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('books');
};
