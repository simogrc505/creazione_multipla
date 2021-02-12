const { map, pick } = require('ramda')

const fields = ['id', 'title', 'author', 'genre', 'isbn', 'manual_edited_at', 'text']

module.exports = {
  one: pick(fields),
  many: map(pick(fields)),
}