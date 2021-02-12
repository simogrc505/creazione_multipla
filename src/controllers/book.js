const error = require('../views/error')

// UTILITIES
const { headers } = require('../utilities/pagination')
const { get_books } = require('../microservices/books')
const { create_bulk_books, bulk } = require('../utilities')

const list = (req, res) => {
  return get_books()
    .then(response => {
      headers(res, response.headers)
      return response.body
    })
    .then(result => res.status(200).json(result))
    .catch(error.generic(res))
}

const bulk_create = (req, res) => {
  return create_bulk_books(req.body)
    .then(result => res.status(201).json(result))
    .catch(error.generic(res))
}

const generate_100 = (req, res) => {
  return bulk()
  .then(books => create_bulk_books(books))
  .then(result => res.status(201).json(result))
    .catch(error.generic(res))
}

let books = require('express').Router()

books.get('/',
  list
)

books.post('/',
  bulk_create
)

books.post('/bulk',
  generate_100
)

module.exports = books