const { compose, curry, assoc, length, prop } = require('ramda')

const append_headers = curry((res, params) => {
  return res
    .set('x-total', params.total)
    .set('x-page', params.page)
    .set('x-count', length(params.docs))
    .set('x-limit', params.limit)
    .set('x-from', ((params.page - 1) * params.limit) + 1)
    .set('x-to', ((params.page - 1) * params.limit) + params.docs.length + 1)
})

const create_filters = curry((params, results) => {
  return compose(
    assoc('offset', (parseInt(params.page) - 1) * parseInt(params.limit)),
    assoc('limit', parseInt(params.limit)),
    assoc('page', parseInt(params.page))

  )(results)
})

const headers = curry((res, header) => {
  return res
    .set('x-total', prop('x-total', header) || 1)
    .set('x-page', prop('x-page', header) || 1)
    .set('x-count', prop('x-count', header) || 1)
    .set('x-limit', prop('x-limit', header) || 1)
    .set('x-from', prop('x-from', header) || 1)
    .set('x-to', prop('x-to', header) || 1)
})

module.exports = {
  append_headers,
  create_filters,
  headers
}