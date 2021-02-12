const { compose, bind, prop, assoc, mergeDeepLeft, tap } = require('ramda')
const error = require('../views/error')

// UTILITIES
const { create_filters, append_headers } = require('../utilities/pagination')
const { create_bulk_books, bulk } = require('../utilities')
const repo = require('../models/repo/books')
const view = require('../views/book')

const list = (req, res) => {
  let params = compose(
    mergeDeepLeft(req.query),
    assoc('page', 1),
    assoc('limit', 25),
    assoc('orderBy', 'created_at'),
    assoc('order', 'ASC')
  )({})

  return repo
    .list(params)
    .then(create_filters(params))// ASSOC OFFSET E LIMIT AL RISULTATO DA PASSARE AD APPEND HEADERS(PER SETTARE I VARI CUSTOM HEADERS)
    .then(tap(append_headers(res)))
    .then(prop('docs'))
    .then(compose(bind(res.json, res), view.many))
    .catch(error.generic(res))
}

const bulk_create = (req, res) => {
  return create_bulk_books(req.body)
    .then(result => res.status(201).json(view.many(result)))
    .catch(error.generic(res))
}

const generate_100 = (req, res) => {
  return bulk()
  .then(books => create_bulk_books(books))
  .then(result => res.status(201).json(view.many(result)))
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