const bc  = require('bcrypt-nodejs')
const mdb = require('./mongo_client')

module.exports = (io) => {
  var cntrl = {
    showCreate: (req, res) => {
      res.render('create', {message: "hi pug"})
    },
    showIndex: (req, res) => {
      console.log(req.query)

      mdb
        .db()
        .collection('boards')
        .findOne({_id : req.params.id}, {els: 0, features: 0}, (err, result) => {
          if (err) {
            console.log("board findOne err", err)
          }
          if (result) {
            if (!io.nsps[`/${result._id}`]) {
              io.Namespace(result, () => {
                res.render('index', {board: result})
              })
            }
            else {
              res.render('index', {board: result})
            }
          }
          else {
            res.redirect('/')
          }
          // mdb.close()
        })
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
              io.Namespace(result, () => {
                res.render('board', {board: result})
              })
            }
            else {
              res.render('board', {board: result})
            }
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
        // suppress fetching els for client (faster load)
        // SIKE we can't surpress rn bc current method is
        // causing overwrite of els with blank array :(...
        .findOne({_id : req.params.id}, {admin: 0}, (err, result) => {
          if (err) {
            console.log("client findOne err", err)
          }
          if (result) {
            if (!io.nsps[`/${result._id}`]) {
              io.Namespace(result, () => {
                res.render('client', {board: result})
              })
            }
            else {
              res.render('client', {board: result})
            }
          }
          else {
            res.redirect('/')
          }
          // mdb.close()
        })
    },
    showAdmin: (req, res) => {
      if (req.cookies["yogaAdmin"]) {
        var adminArray = JSON.parse(req.cookies["yogaAdmin"])
        if (adminArray.indexOf(req.params.id) > -1) {
          cntrl.fetchAndRenderAdmin(req, res)
        }
        else {
          res.redirect(`/${req.params.id}/admin/auth`)
        }
      }
      else {
        res.redirect(`/${req.params.id}/admin/auth`)
      }
    },
    showAuthAdmin: (req, res) => {
      res.render("auth_admin", {
        slug: req.params.id
      })
    },
    fetchAndRenderAdmin: (req, res) => {
      mdb
        .db()
        .collection('boards')
        .findOne({_id : req.params.id}, {}, (err, result) => {
          if (err) {
            console.log("admin findOne err", err)
          }
          if (!io.nsps[`/${result._id}`]) {
            io.Namespace(result, () => {
              res.render('admin', {board: result})
            })
          }
          else {
            res.render('admin', {board: result})
          }
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
          res.status(200).json(insert.ops[0])
          // mdb.close()
        })
    },
    authAdmin: (req, res) => {
      mdb
        .db()
        .collection('boards')
        .findOne({_id: req.params.id}, (err, result) => {
          if (err) {
            console.log("admin auth err", err)
          }

          if (req.body.user.email.toLowerCase() !==
              result.admin.email.toLowerCase()) {
            res.render('auth_admin', {
              error: "wrong email address",
              slug: req.params.id
            })
            return
          }

          bc.compare(req.body.user.password, result.admin.password , (err, check) => {
            // console.log(result._id)
            if (check) {
              if (req.cookies["yogaAdmin"]) {
                console.log
                var adminArray = JSON.parse(req.cookies["yogaAdmin"])
                adminArray.push(result._id)
                adminArray = JSON.stringify(adminArray)
                res.cookie('yogaAdmin', adminArray, {maxAge: 900000, httpOnly: true})
                res.redirect(`/${result._id}/admin`)
              }
              else {
                res.cookie('yogaAdmin', JSON.stringify([result._id]), {maxAge: 900000, httpOnly: true})
                res.redirect(`/${result._id}/admin`)
              }
            }
            else {
              res.render('auth_admin', {
                error: "wrong password",
                slug: req.params.id
              })
            }
          })
        })
    },
  }

  return cntrl
}
