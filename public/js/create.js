(function(){
  var form = document.getElementById("board_form")

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
      img_upload: document.getElementById("board_features_img_upload").checked
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
        "<a href='/"+json._id+"'>view board</a>" +
        "<a href='/"+json._id+"/admin'>admin dashboard</a>" +
        "<a href='/"+json._id+"/party'>wur the party at</a>"
      form.appendChild(responseText)
    })
  }

  // var testName = function() {
  //   var name = document.getElementById("board_name")
  //   try (name.value)
  // }

  form.addEventListener("submit", formSubmit)
})()

