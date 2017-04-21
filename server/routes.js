const mdb = require('./mongo_client')

module.exports.initialize = (app, router, io) => {
  var controlla = require('./controller')(io)

  router.get('/favicon.ico', function(req, res) {
      res.status(204);
  });

  router.get('/', controlla.showCreate)
  router.get('/:id', controlla.showBoard)
  router.get('/:id/admin', controlla.showAdmin)
  router.get('/:id/admin/auth', controlla.showAuthAdmin)
  router.get('/:id/party', controlla.showClient)

  router.get('/board/:id', controlla.findBoard)
  router.post('/board', controlla.postBoard)

  router.post('/:id/admin/auth', controlla.authAdmin)

  // router.get('/:id/admin/wipe', controlla.wipeBoard)

  app.use('/', router)
}
