const mdb = require('./mongo_client')

module.exports.initialize = (app, router, io) => {
  var controlla = require('./controller')(io)

  router.get('/favicon.ico', function(req, res) {
      res.status(204);
  });

  router.get('/', controlla.showCreate)
  router.get('/:id', controlla.showIndex)
  router.get('/:id/view', controlla.showBoard)
  router.get('/:id/admin', controlla.showAdmin)
  router.get('/:id/admin/auth', controlla.showAuthAdmin)
  router.get('/:id/remote', controlla.showClient)

  router.get('/board/:id', controlla.findBoard)
  router.post('/board', controlla.postBoard)

  router.post('/:id/admin/auth', controlla.authAdmin)

  // fallback if crayfish
  // router.get('/:id/*', (req, res) => {
  //   res.redirect(`/${req.params.id}`)
  // })

  // router.get('/:id/admin/wipe', controlla.wipeBoard)

  app.use('/', router)
}
