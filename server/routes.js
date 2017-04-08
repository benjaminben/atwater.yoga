const mdb = require('./mongo_client')
const controlla = require('./controller')

module.exports.initialize = (app, router) => {
  router.get('/favicon.ico', function(req, res) {
      res.status(204);
  });

  router.get('/', controlla.showCreate)
  router.get('/:id', controlla.showBoard)
  router.get('/:id/admin', controlla.showAdmin)
  router.get('/:id/party', controlla.showClient)

  router.get('/board/:id', controlla.findBoard)
  router.post('/board', controlla.postBoard)

  app.use('/', router)
}
