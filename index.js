const express   = require('express')
const configure = require('./server/config')
const keys      = require('./keys')
const mdb       = require('./server/mongo_client')
const routes    = require('./server/routes')
const app       = configure(express())

const server = app.listen(app.get('port'), function(){
  console.log('party on', app.get('port'));
  var io = require('./server/io')(server)
  routes.initialize(app, new express.Router(), io)

  mdb.connect({user: keys.mongo_user, pw: keys.mongo_pw}, function() {
    console.log('Connected to MongoDB')
  })
});
