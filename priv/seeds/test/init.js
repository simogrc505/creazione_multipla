/* eslint-disable prefer-promise-reject-errors */
const mongoose = require('mongoose')
const config = require('config')
const data_email = require('./load-users')

mongoose.connect(config.db.host, config.db.options)
data_email.seed()
  .then(() => console.log("OKI"))
  .catch((err) => {
    if (err) {
      throw err
    }
    console.log(err)
  })
  .finally(() => {
    mongoose.disconnect()
  })
