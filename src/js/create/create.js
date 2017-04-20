(function(){
  var form = document.getElementById("board_form")
  var reqs = document.querySelectorAll("#board_form input[required]")
  var submit = document.getElementById("board_submit")
  var slug = document.getElementById("board_id")
  var slugTimeout

  var formValidate = function(e) {
    var ready = true

    for (var i = 0; i < reqs.length; i++) {
      if (!reqs[i].value) {
        ready = false
      }
    }
    if (slug.taken) {
      ready = false
    }
    if (document.getElementById("board_admin_pw").value !==
        document.getElementById("board_admin_pw_conf").value) {
      ready = false
    }

    if (ready) {
      submit.removeAttribute("disabled")
    }
    else {
      submit.setAttribute("disabled", "")
    }
  }

  var formSubmit = function(e) {
    e.preventDefault()

    var blob = {}
    blob._id = document.getElementById("board_id").value
    blob.title = document.getElementById("board_title").value
    blob.admin = {
      email: document.getElementById("board_admin_email").value,
      password: document.getElementById("board_admin_pw").value
    }
    blob.features = {
      text: document.getElementById("board_features_text").checked,
      img_url: document.getElementById("board_features_img_url").checked,
      img_upload: document.getElementById("board_features_img_upload").checked,
      doodle: document.getElementById("board_features_doodle").checked
    }
    blob.privacy = {
      board: document.getElementById("board_private").checked,
      client: document.getElementById("client_private").checked
    }

    fetch('/board', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blob)
    }).then(function(res) {
      return res.json()
    })
    .then(function(json) {
      var responseText = document.createElement('p')
      responseText.innerHTML =
        "<a href='/"+json._id+"'>view board</a><br/>" +
        "<a href='/"+json._id+"/admin'>admin dashboard</a><br/>" +
        "<a href='/"+json._id+"/party'>wur the party at</a>"
      form.appendChild(responseText)
    })
  }

  for (var i = 0; i < reqs.length; i++) {
    reqs[i].addEventListener("input", formValidate)
  }

  slug.addEventListener("input", function() {
    window.clearTimeout(slugTimeout)
    slugTimeout = window.setTimeout(function() {
      console.log("fetching", slug.value)
      slug.className = "searching"
      fetch('/board/'+slug.value, {
        method: 'GET'
      })
      .then(function(res) {
        return res.json()
      })
      .then(function(res) {
        if (res.err) {
          console.log(res.err)
          return res.err
        }
        else {
          if (res.result) {
            slug.className = "taken"
            slug.taken = true
            return false
          }
          slug.className = "available"
          slug.taken = false
          formValidate()
          return true
        }
      })
    }, 1000)
  })

  form.addEventListener("submit", formSubmit)
})()

