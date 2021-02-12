const mongoose = require('mongoose')
const uuid = require('node-uuid')
const Schema = mongoose.Schema

const schema = new Schema({
  _id: {type: String, default: uuid.v4},
  title: { type: String },
  author: { type: String },
  genre: { type: String },
  isbn: { type: String },
  created_at: { type: Date },
  edited_at: { type: Date },
}, {collection: 'books'})


module.exports = mongoose.model('Book', schema)
