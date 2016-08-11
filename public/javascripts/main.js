window.onload = function () {
  var login = document.getElementsByClassName('btn-login')[0];
  var article = document.getElementsByClassName('post');
  for (var i=0; i < article.length; i++) {
    article[i].addEventListener('mouseover', function (event) {
       event.target.style.cursor = "pointer";
    });
    article[i].addEventListener('mousedown', function (event) {
      event.preventDefault();
    });
    article[i].addEventListener('mouseup', function (event) {
      var id = undefined;
      event.preventDefault();
      if (event.target.nodeName === "ARTICLE") {
        id = event.target.id;
        window.location.href = "/post/" + id;
      } else {
        id = event.target.parentNode.id;
        window.location.href = "/post/" + id;
      }
    });
  }
  login.addEventListener('click', function (event) {
    window.location.href = "/login";
  });

  if (window.location.pathname === '/login') {
    var forms = document.getElementsByTagName('form')[0];
    forms.addEventListener('submit', function (event) {
      event.preventDefault();
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
      var dataForSendToServer = {
        username: username,
        password: password
      };
      $.ajax({
        url: '/login',
        method: 'POST',
        data: JSON.stringify(dataForSendToServer),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        statusCode: {
          200: function (data) {
            alert("Welcome, " + data.username);
            window.location.href = "/";
          },
          403: function (jqXHR) {
            var error = JSON.parse(jqXHR.responseText);
            alert(error);
          }
        }
      });
    });
  }
}
