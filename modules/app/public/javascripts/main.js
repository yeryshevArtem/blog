window.onload = function () {
  var table = document.getElementsByTagName('table')[0];
  table.onmouseover = function (event) {
    event.target.style.cursor = "pointer";
  }
  table.addEventListener('click', function (event) {
    event.preventDefault();
    var tr = event.target.parentNode;
    var id = tr.id;
      window.location.href = "/post/" + id;
  });
  var login = document.getElementsByClassName('login')[0];
  login.addEventListener('click', function (event) {
    window.location.href = "/login";
  });
}
