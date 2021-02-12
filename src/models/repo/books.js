const Book = require('../book');
const {map, toPairs, omit, tap} = require('ramda');

module.exports = {
  list: (params) => {
    let query = Book.query();

    map(([key, value]) => {
      query.where(key, value)
    }, toPairs(omit(['page', 'limit', 'offset', 'orderBy', 'order'], params)));

    return query
      .limit(params.limit)
      .offset(params.offset)
      .orderBy(params.orderBy, params.order)
      .skipUndefined()
      .where(omit(['limit', 'offset', 'orderBy', 'page', 'order'], params))
  },

  get: (id) => {
    return Book
      .query()
      .where({id: id})
      .first()
  },

  create: (body) => {
    return Book.query().insert(body)
    .then(book =>  {
      return Book.query().where({id: book.id}).first()
    })
  },

  update: (id, body) => {
    return Book
      .query().where({id: id}).first().update(body)
      .then(() => Book.query().where({id: id}).first())
  },

  delete: (id) => {
    return Book.query().where({id: id}).first()
    .then(book => {
      return Book.query().where({id: id}).del()
      .then(() => book)
    })
  },

  count: (params) => {
    let query = Book.query()

    map(([key, value]) => {
      query.where(key, value)
    }, toPairs(omit(['limit', 'offset', 'orderBy', 'page', 'order'], params)));

    return query
      .count('id as counts')
      .first()
  },

};