const express = require('express')
const bp      = require('body-parser')
const cp      = require('cookie-parser')
const path    = require('path')
const fs      = require('fs')

module.exports = (app) => {
  app.set('port', process.env.PORT || 8080)
  app.use(express.static(__dirname + '/../public'))
  app.use(cp())
  app.use(bp.json())
  app.use(bp.urlencoded({ extended: true }))
  app.set('view engine', 'pug')

  return app
}
