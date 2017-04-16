const bc  = require('bcrypt-nodejs')
const mdb = require('./mongo_client')

module.exports = (io) => {
  return {
    showCreate: (req, res) => {
      res.render('create', {message: "hi pug"})
    },
    showBoard: (req, res) => {
      mdb
        .db()
        .collection('boards')
        .findOne({_id : req.params.id}, (err, result) => {
          if (err) {
            console.log("board findOne err", err)
          }
          if (result) {
            if (!io.nsps[`/${result._id}`]) {
              io.Namespace(result._id)
            }
            res.render('board', {board: result})
          }
          else {
            res.redirect('/')
          }
          // mdb.close()
        })
    },
    showClient: (req, res) => {
      mdb
        .db()
        .collection('boards')
        .findOne({_id : req.params.id}, (err, result) => {
          if (err) {
            console.log("client findOne err", err)
          }
          if (result) {
            if (!io.nsps[`/${result._id}`]) {
              io.Namespace(result._id)
            }
            res.render('client', {board: result})
          }
          else {
            res.redirect('/')
          }
          // mdb.close()
        })
    },
    showAdmin: (req, res) => {
      mdb
        .db()
        .collection('boards')
        .findOne({_id : req.params.id}, (err, result) => {
          if (err) {
            console.log("admin findOne err", err)
          }
          res.render('admin', {board: result})
          // mdb.close()
        })
    },
    findBoard: (req, res) => {
      console.log("querying mdb for", req.params.id)
      mdb
        .db()
        .collection('boards')
        .findOne({_id: req.params.id}, (err, result) => {
          if (err) {
            console.log("id check err", err)
            return res.status(500).json({err: "sigh, a vague error :("})
          }
          res.status(200).json({result: result})
        })
    },
    postBoard: (req, res) => {
      var board = req.body
      var hash = bc.hashSync(req.body.admin.password)

      board.admin.password = hash

      mdb
        .db()
        .collection('boards')
        .insertOne(board, (err, insert) => {
          if (err) {
            console.log("board insertion err", err)
          }
          // io.Namespace(insert.ops[0]._id)
          res.status(200).json(insert.ops[0])
          // mdb.close()
        })
    },
  }
}
