const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({
  passError: true,
})

exports.validate_books_input = validator.query(Joi.object({
  limit: Joi.number().integer().min(1).max(1000),
  page: Joi.number().integer().min(0).max(25),
  order: Joi.string().valid('ASC', 'DESC'),
  orderBy: Joi.string().min(1),
}))

exports.validate_create_book_input = validator.body(Joi.object({
  title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string(),
    isbn: Joi.string(),
    published: Joi.date(),
}))

exports.validate_patch_book_input = validator.body(Joi.object({
  title: Joi.string(),
    author: Joi.string(),
    genre: Joi.string(),
    isbn: Joi.string(),
    published: Joi.date(),
}))
