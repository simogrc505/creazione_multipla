const { omit, toLower } = require('ramda')
const { if_exists } = require('../../utilities/errors_code')
const Book = require('../book')

module.exports = {
  list: (params) => {
    let where = omit(['limit', 'offset', 'orderBy', 'page', 'order'], params)
    return Promise.all([
      Book
        .find(where)
        .skip((params.page - 1) * params.limit)
        .limit(params.limit)
        .sort({ [params.orderBy]: toLower(params.order) }),
      Book.countDocuments(where)
    ])
      .then(([docs, total]) => {
        return {
          docs,
          total,
        }
      })
  },
  get: (id) => {
    return Book.findById({ _id: id })
    .then(if_exists)
  },

  create: (body) => {
    body.created_at = new Date()
    return Book.create(body)
  },
  update: (id, body) => {
    body.edited_at = new Date()
    return Book.Book.findById({ _id: id })
      .then(if_exists)
      .then(() => Book.findOneAndUpdate(id, body, { new: true }))
  },
  delete: (id) => {
    return Book.findById({ _id: id })
      .then(if_exists)
      .then((Book) => {
        return Book.findOneAndRemove({ _id: id })
          .then(() => Book)
      })
  },
}
