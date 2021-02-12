const config = require('config')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const actions = require('./controllers')
const error_handler = require('./middleware/error-handler')
const mongoose = require('mongoose')
// mongoose.set('debug', true);
const { ifElse, isNil, identity, compose, tap } = require('ramda')

const ping = require('@wdalmut/ping')

mongoose.connect(config.db.host, config.db.options, ifElse(isNil, identity, compose(() => process.exit(1)), tap(console.log)))

const app = express()
app.use(ping({ ping_response_body: 'OK' }))
const pino = require('express-pino-logger')({
  name: process.env.APP_NAME,
  base: {
    region: process.env.AWS_REGION,
    env: process.env.NODE_ENV,
  },
  enabled: !(process.env.NODE_ENV === 'test'),
})
app.use(pino)

app.use(cors({ exposedHeaders: ['x-page', 'x-count', 'x-total', 'x-limit', 'x-to', 'x-from'] }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text({ type: 'text/plain' }))
app.use(bodyParser.json({ type: 'application/json' }))

actions.map((paths) => app.use.apply(app, paths))

app.use(error_handler)

app.listen(process.env.NODE_PORT || 3000)

module.exports = app 