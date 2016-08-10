(function () {
  if (window.location.pathname === '/login') {
    var forms = document.getElementsByTagName('form')[0];
    forms.addEventListener('submit', function (event) {
      var username = document.getElementById('inputUsername').value;
      var password = document.getElementById('inputPassword').value;
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
        success: function (dataFromServer) {
          // console.log(dataFromServer);
        },
        failure: function (errMsg) {
          alert(errMsg);
        }
      });
    });
  }
})();
