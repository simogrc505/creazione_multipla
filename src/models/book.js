const config = require('config');
const { Model } = require('objection');

const Knex = require('knex');

// Initialize knex.
const knex = Knex(config.db);
//knex.on('query', (i) => console.log(i.sql))

// Give the knex object to objection.
Model.knex(knex);

// Person model.
class Book extends Model {
  static get tableName() {
    return 'books';
  }
  static get idColumn() {
    return 'id'
  }
}

module.exports = Book;