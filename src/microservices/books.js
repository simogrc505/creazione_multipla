const request = require('request')
const config = require('config')

module.exports = {
  get_books: () => new Promise((resolve, reject) => {
    // console.log(`${config.host_name}/books`)
    request({
      uri: `https://app-3001-8b94c83b0fc1.ide.corley.cloud/books`,
      method: 'GET',
      json: true,
    }, (err, response) => {

      if (err || response.statusCode >= 400) {
        return reject(err || response.body)
      }

      return resolve(response)
    })
  }),

  get_book: (id) => new Promise((resolve, reject) => {
    request({
      uri: `https://app-3001-8b94c83b0fc1.ide.corley.cloud/books/${id}`,
      method: 'GET',
      json: true,
    }, (err, response) => {
      if (err || response.statusCode >= 400) {
        return reject(err || response.body)
      }

      return resolve(response.body)
    })
  }),

  create_book: (body) => new Promise((resolve, reject) => {
    body.created_at = new Date()
    request({
      uri: 'https://app-3001-8b94c83b0fc1.ide.corley.cloud/books',
      method: 'POST',
      json: true,
      body: body
    }, (err, response) => {
    
      if (err || response.statusCode >= 400) {
        return reject(err || response.body)
      }

      return resolve(response.body)
    })
  }),

  update_book: (id, body) => new Promise((resolve, reject) => {
    body.edited_at = new Date()
    request({
      uri: `https://app-3001-8b94c83b0fc1.ide.corley.cloud/books/${id}`,
      method: 'PATCH',
      json: true,
      body: body
    }, (err, response) => {
      
      if (err || response.statusCode >= 400) {
        return reject(err || response.body)
      }

      return resolve(response.body)
    })
  }),

  delete_book: (id) => new Promise((resolve, reject) => {
    request({
      uri: `https://app-3001-8b94c83b0fc1.ide.corley.cloud/books/${id}`,
      method: 'DELETE',
      json: true,
    }, (err, response) => {
      
      if (err || response.statusCode >= 400) {
        return reject(err || response.body)
      }

      return resolve(response.body)
    })
  })

}