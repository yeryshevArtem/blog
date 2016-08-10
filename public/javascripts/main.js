window.onload = function () {
  var login = document.getElementsByClassName('btn-login')[0];
  var article = document.getElementsByClassName('post');
  console.log(article);
  for (var i=0; i < article.length; i++) {
    article[i].addEventListener('mouseover', function (event) {
       event.target.style.cursor = "pointer";
    });
    article[i].addEventListener('mousedown', function (event) {
      event.preventDefault();
    });
    article[i].addEventListener('mouseup', function (event) {
      event.preventDefault();
      var id = event.target.parentNode.id;
      window.location.href = "/post/" + id;
    });
  }
  login.addEventListener('click', function (event) {
    window.location.href = "/login";
  });
}
