const express = require('express')
const bp      = require('body-parser')
const path    = require('path')
const fs      = require('fs')
const routes  = require('./routes')

module.exports = (app) => {
  app.set('port', process.env.PORT || 8080)
  app.use(express.static('public'))
  app.use(bp.json())
  app.set('view engine', 'pug')

  routes.initialize(app, new express.Router())

  return app
}
