
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();

    tbl
      .string('username', 255)
      .notNullable()
      .unique();

    tbl.string('first_name', 255)
    tbl.string('last_name', 255)
    tbl.string('gender')
    tbl.string('avatar')
    tbl.string('password', 128)
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
