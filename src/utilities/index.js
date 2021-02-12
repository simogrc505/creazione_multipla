const { map } = require('ramda')
const limit = require('p-limit')(1)
const repo = require('../models/repo/books')

const create_bulk_books = (books) => {
  let book_promises = map((book) =>
    limit(
      () => repo.create(book)
      // .then((book) => assoc('company', company, user))
    ), books)

  return Promise.all(book_promises)
}

const bulk = () => {
  let arr = []
  for (let i = 1; i <= 100; i++) {
    arr.push({
      title: "title" + i,
      author: "author" + i,
      isbn: "isbn" + i,
      genre: "genre" + i,
      published: new Date(),
      created_a
    })
  }
  return Promise.resolve(arr)
}

module.exports = {
  create_bulk_books,
  bulk
}