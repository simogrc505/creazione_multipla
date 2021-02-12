exports.up = function (knex, Promise) {
  return knex.schema.createTable("books", function (t) {
    t.charset('utf8');
    t.collate('utf8_general_ci');
    t.increments('id').unsigned().primary();
    t.string('title').notNull();
    t.string('author').notNull();
    t.string('genre').nullable();
    t.string('isbn');
    t.date('published');
    t.dateTime('created_at').notNull();
    t.dateTime('edited_at').nullable();
  });
};

exports.down = function (knex, Promise) {

};