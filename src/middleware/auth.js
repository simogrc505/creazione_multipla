const config = require('config')
const request = require('request');

module.exports = (req) => new Promise((resolve, reject) => {
  request.get({
    uri: config.endpoints.user + "/v1/me",
    method: 'GET',
    json: true,
    headers: {
      authorization: `${req.headers.authorization}`
    }
  }, (err, response) => {
    if (err || response.statusCode >= 400) {
      return reject(err || response.body);
    }

    return resolve(response.body);
  });

})