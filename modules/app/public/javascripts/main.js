window.onload = function () {

  var login = document.getElementsByClassName('btn-login')[0];

  if (window.location.pathname == '/') {
    var tbody = document.getElementsByTagName('tbody')[0];
    var table = document.getElementsByTagName('table')[0];
    tbody.addEventListener('mouseover', function (event) {
      event.target.style.cursor = "pointer";
    });

    table.addEventListener('mousedown', function (event) {
      event.preventDefault();
    });

    tbody.addEventListener('mouseup', function (event) {
      event.preventDefault();
      var tr = event.target.parentNode;
      var id = tr.id;
      window.location.href = "/post/" + id;
    });

    login.addEventListener('click', function (event) {
      window.location.href += "login";
    });

  } else {
    login.addEventListener('click', function (event) {
      window.location.href = window.location.href + "/login";
    });
  }
}
