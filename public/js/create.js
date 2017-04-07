(function(){
  var form = document.getElementById("board_form")

  var formSubmit = function(e) {
    e.preventDefault()

    var blob = {}
    blob.name = document.getElementById("board_name").value
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
    })
  }

  // var testName = function() {
  //   var name = document.getElementById("board_name")
  //   try (name.value)
  // }

  form.addEventListener("submit", formSubmit)
})()

