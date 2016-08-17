window.onload = function () {

  var login = document.getElementsByClassName('btn-login')[0];
  var register = document.getElementsByClassName('btn-register')[0];
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

  if (login) {
    login.addEventListener('click', function (event) {
      window.location.href = "/login";
    });
  }
  if (register) {
    register.addEventListener('click', function (event) {
      window.location.href = "/register";
    });
  }

  if (window.location.pathname === '/login') {
    var form = document.getElementsByClassName('form-login')[0];

    var passwordDOM = document.getElementById('passwordLogin');
    var formGroupForPassword = passwordDOM.parentNode.parentNode;
    var usernameDOM = document.getElementById('usernameLogin');
    var formGroupForUsername = usernameDOM.parentNode.parentNode;

    var usernameVal = undefined;
    var passwordVal = undefined;
    var containerForRenderErrorUsername = undefined;
    var containerForRenderErrorPassword = undefined;

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      function addSuccessClass (arrayOfFormGroup) {
        arrayOfFormGroup.forEach(function (formGroup) {
          formGroup.classList.add("has-success");
        });
      }

      function deleteErrorClass (formGroupFor, elementOfDOM, containerForRenderError) {
        formGroupFor.classList.remove("has-error");
        elementOfDOM.nextSibling.nextSibling.innerHTML = "";
        containerForRenderError.style.visibility = "hidden";
      }

      function addErrorClass (formGroupForAddingErrorClass, errMessage) {
        if (formGroupForAddingErrorClass === formGroupForUsername) {
          containerForRenderErrorUsername = document.getElementsByClassName('help-block-username')[0];

          if (formGroupForEmail) {
            if (formGroupForEmail.classList.contains("has-error")) {
              deleteErrorClass(formGroupForEmail, emailDOM, containerForRenderErrorEmail);
            }
          }
          if (formGroupForPassword.classList.contains("has-error")) {
            deleteErrorClass(formGroupForPassword, passwordDOM, containerForRenderErrorPassword);
          }
          if (formGroupForUsername.classList.contains("has-error")) {
            deleteErrorClass(formGroupForUsername, usernameDOM, containerForRenderErrorUsername);
          }

          if (!formGroupForUsername.classList.contains("has-error")) {
            formGroupForUsername.classList.add("has-error");
            var warningText = document.createTextNode("" + errMessage);
            containerForRenderErrorUsername.appendChild(warningText);
            containerForRenderErrorUsername.style.visibility = "visible";
          } else {
            containerForRenderErrorUsername.style.visibility = "visible";
          }
          usernameDOM.addEventListener('focus', function () {
            if (formGroupForUsername.classList.contains("has-error")) {
              containerForRenderErrorUsername.style.visibility = "hidden";
            }
          });
          usernameDOM.addEventListener('blur', function () {
            if (formGroupForUsername.classList.contains("has-error")) {
              containerForRenderErrorUsername.style.visibility = "visible";
            }
          });
        } else if (formGroupForAddingErrorClass === formGroupForEmail) {
          containerForRenderErrorEmail = document.getElementsByClassName('help-block-email')[0];

          if (formGroupForUsername.classList.contains("has-error")) {
            deleteErrorClass(formGroupForUsername, usernameDOM, containerForRenderErrorUsername);
          }
          if (formGroupForPassword.classList.contains("has-error")) {
            deleteErrorClass(formGroupForPassword, passwordDOM, containerForRenderErrorPassword);
          }

          if (!formGroupForEmail.classList.contains("has-error")) {
            formGroupForEmail.classList.add("has-error");
            var warningText = document.createTextNode("" + errMessage);
            containerForRenderErrorEmail.appendChild(warningText);
            containerForRenderErrorEmail.style.visibility = "visible";
          } else {
            containerForRenderErrorEmail.style.visibility = "visible";
          }
          emailDOM.addEventListener('focus', function () {
            if (formGroupForEmail.classList.contains("has-error")) {
              containerForRenderErrorEmail.style.visibility = "hidden";
            }
          });
          emailDOM.addEventListener('blur', function () {
            if (formGroupForEmail.classList.contains("has-error")) {
              containerForRenderErrorEmail.style.visibility = "visible";
            }
          });
        } else if (formGroupForAddingErrorClass === formGroupForPassword) {
          containerForRenderErrorPassword = document.getElementsByClassName('help-block-password')[0];

          if (formGroupForEmail) {
            if (formGroupForEmail.classList.contains("has-error")) {
              deleteErrorClass(formGroupForEmail, emailDOM, containerForRenderErrorEmail);
            }
          }
          if (formGroupForUsername.classList.contains("has-error")) {
            deleteErrorClass(formGroupForUsername, usernameDOM, containerForRenderErrorUsername);
          }
          if (formGroupForPassword.classList.contains("has-error")) {
            deleteErrorClass(formGroupForPassword, passwordDOM, containerForRenderErrorPassword);
          }

          if (!formGroupForPassword.classList.contains("has-error")) {
            formGroupForPassword.classList.add("has-error");
            var warningText = document.createTextNode("" + errMessage);
            containerForRenderErrorPassword.appendChild(warningText);
            containerForRenderErrorPassword.style.visibility = "visible";
          } else {
            containerForRenderErrorPassword.style.visibility = "visible";
          }
          passwordDOM.addEventListener('focus', function () {
            if (formGroupForPassword.classList.contains("has-error")) {
              containerForRenderErrorPassword.style.visibility = "hidden";
            }
          });
          passwordDOM.addEventListener('blur', function () {
            if (formGroupForPassword.classList.contains("has-error")) {
              containerForRenderErrorPassword.style.visibility = "visible";
            }
          });
        }
      }

      function validationForm (inputUsername, inputPassword, minLength, maxLength) {
        function validateUsername (inputUsername) {
          var usernameFormat = /^\w+$/;
          if (inputUsername.value.match(usernameFormat)) {
            usernameVal = inputUsername.value;
            return true;
          } else {
            addErrorClass(formGroupForUsername, 'Username are not valid! Characters, that allowed: A-Z, a-z, 0-9, _');
            return false;
          }
        }

        function validatePassword (inputPassword, minLength, maxLength) {
          var passwordLength = inputPassword.value.length;
          if (passwordLength === 0 || passwordLength < minLength || passwordLength > maxLength) {
            addErrorClass(formGroupForPassword, "Password should not be empty / length be between " + minLength + " to " + maxLength + "!");
            return false;
          } else {
            passwordVal = inputPassword.value;
            return true;
          }
        }

        if (validateUsername(inputUsername)) {
          if (validatePassword(inputPassword, minLength, maxLength)) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }

      var resultOfValidation = validationForm(usernameDOM, passwordDOM, 7, 12);

      if (resultOfValidation) {

        var dataForSendToServer = {
          username: usernameVal,
          password: passwordVal
        };

        $.ajax({
          url: '/login',
          method: 'POST',
          data: JSON.stringify(dataForSendToServer),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            if (formGroupForPassword.classList.contains("has-error")) {
              deleteErrorClass(formGroupForPassword, passwordDOM, containerForRenderErrorPassword);
            }
            if (formGroupForUsername.classList.contains("has-error")) {
              deleteErrorClass(formGroupForUsername, usernameDOM, containerForRenderErrorUsername);
            }

            addSuccessClass([formGroupForUsername, formGroupForPassword]);

            // handler modal window
            $('#myModalLogin').on('show.bs.modal', function() {
              var $modal = $(this);
              $modal.find('.modal-body > p').html("Authentication is successful! Welcome, dear " + data.username + "!");
            });
            $('#myModalLogin').modal('show');
            setTimeout(function () {
              $('#myModalLogin').modal('hide');
              if (data.isAdmin) {
                window.location.href = "/admin#/posts";
              } else {
                window.location.href = "/";
              }
            }, 2000);
          },
          error: function (jqXHR) {
            var error = JSON.parse(jqXHR.responseText);

            if (error.indexOf("password") != -1) {
              addErrorClass(formGroupForPassword, error);

            } else if (error.indexOf("username") != -1) {
              addErrorClass(formGroupForUsername, error);
            }
          }
        });
      }
    });
  } else if (window.location.pathname === '/register') {
    var form = document.getElementsByClassName('form-register')[0];

    var passwordDOM = document.getElementById('passwordRegister');
    var formGroupForPassword = passwordDOM.parentNode.parentNode;
    var usernameDOM = document.getElementById('usernameRegister');
    var formGroupForUsername = usernameDOM.parentNode.parentNode;
    var emailDOM = document.getElementById('emailRegister');
    var formGroupForEmail = emailDOM.parentNode.parentNode;

    var containerForRenderErrorUsername = undefined;
    var containerForRenderErrorPassword = undefined;
    var containerForRenderErrorEmail = undefined;

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var emailVal = undefined;
      var usernameVal = undefined;
      var passwordVal = undefined;

      function addSuccessClass (arrayOfFormGroup) {
        arrayOfFormGroup.forEach(function (formGroup) {
          formGroup.classList.add("has-success");
        });
      }

      function deleteErrorClass (formGroupFor, elementOfDOM, containerForRenderError) {
        formGroupFor.classList.remove("has-error");
        elementOfDOM.nextSibling.nextSibling.innerHTML = "";
        containerForRenderError.style.visibility = "hidden";
      }

      function addErrorClass (formGroupForAddingErrorClass, errMessage) {
        if (formGroupForAddingErrorClass === formGroupForUsername) {
          containerForRenderErrorUsername = document.getElementsByClassName('help-block-username')[0];

          if (formGroupForEmail) {
            if (formGroupForEmail.classList.contains("has-error")) {
              deleteErrorClass(formGroupForEmail, emailDOM, containerForRenderErrorEmail);
            }
          }
          if (formGroupForPassword.classList.contains("has-error")) {
            deleteErrorClass(formGroupForPassword, passwordDOM, containerForRenderErrorPassword);
          }
          if (formGroupForUsername.classList.contains("has-error")) {
            deleteErrorClass(formGroupForUsername, usernameDOM, containerForRenderErrorUsername);
          }

          if (!formGroupForUsername.classList.contains("has-error")) {
            formGroupForUsername.classList.add("has-error");
            var warningText = document.createTextNode("" + errMessage);
            containerForRenderErrorUsername.appendChild(warningText);
            containerForRenderErrorUsername.style.visibility = "visible";
          } else {
            containerForRenderErrorUsername.style.visibility = "visible";
          }
          usernameDOM.addEventListener('focus', function () {
            if (formGroupForUsername.classList.contains("has-error")) {
              containerForRenderErrorUsername.style.visibility = "hidden";
            }
          });
          usernameDOM.addEventListener('blur', function () {
            if (formGroupForUsername.classList.contains("has-error")) {
              containerForRenderErrorUsername.style.visibility = "visible";
            }
          });
        } else if (formGroupForAddingErrorClass === formGroupForEmail) {
          containerForRenderErrorEmail = document.getElementsByClassName('help-block-email')[0];

          if (formGroupForUsername.classList.contains("has-error")) {
            deleteErrorClass(formGroupForUsername, usernameDOM, containerForRenderErrorUsername);
          }
          if (formGroupForPassword.classList.contains("has-error")) {
            deleteErrorClass(formGroupForPassword, passwordDOM, containerForRenderErrorPassword);
          }

          if (!formGroupForEmail.classList.contains("has-error")) {
            formGroupForEmail.classList.add("has-error");
            var warningText = document.createTextNode("" + errMessage);
            containerForRenderErrorEmail.appendChild(warningText);
            containerForRenderErrorEmail.style.visibility = "visible";
          } else {
            containerForRenderErrorEmail.style.visibility = "visible";
          }
          emailDOM.addEventListener('focus', function () {
            if (formGroupForEmail.classList.contains("has-error")) {
              containerForRenderErrorEmail.style.visibility = "hidden";
            }
          });
          emailDOM.addEventListener('blur', function () {
            if (formGroupForEmail.classList.contains("has-error")) {
              containerForRenderErrorEmail.style.visibility = "visible";
            }
          });
        } else if (formGroupForAddingErrorClass === formGroupForPassword) {
          containerForRenderErrorPassword = document.getElementsByClassName('help-block-password')[0];

          if (formGroupForEmail) {
            if (formGroupForEmail.classList.contains("has-error")) {
              deleteErrorClass(formGroupForEmail, emailDOM, containerForRenderErrorEmail);
            }
          }
          if (formGroupForUsername.classList.contains("has-error")) {
            deleteErrorClass(formGroupForUsername, usernameDOM, containerForRenderErrorUsername);
          }

          if (!formGroupForPassword.classList.contains("has-error")) {
            formGroupForPassword.classList.add("has-error");
            var warningText = document.createTextNode("" + errMessage);
            containerForRenderErrorPassword.appendChild(warningText);
            containerForRenderErrorPassword.style.visibility = "visible";
          } else {
            containerForRenderErrorPassword.style.visibility = "visible";
          }
          passwordDOM.addEventListener('focus', function () {
            if (formGroupForPassword.classList.contains("has-error")) {
              containerForRenderErrorPassword.style.visibility = "hidden";
            }
          });
          passwordDOM.addEventListener('blur', function () {
            if (formGroupForPassword.classList.contains("has-error")) {
              containerForRenderErrorPassword.style.visibility = "visible";
            }
          });
        }
      }

      function validationForm (inputEmail, inputUsername, inputPassword, minLength, maxLength) {
        function validateEmail (inputEmail) {
          var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (inputEmail.value.match(mailFormat)) {
            emailVal = inputEmail.value;
            return true
          } else {
            addErrorClass(formGroupForEmail, "You have entered an invalid email address!");
            return false;
          }
        }

        function validateUsername (inputUsername) {
          var usernameFormat = /^\w+$/;
          if (inputUsername.value.match(usernameFormat)) {
            usernameVal = inputUsername.value;
            return true;
          } else {
            addErrorClass(formGroupForUsername, 'Username are not valid! Characters, that allowed: A-Z, a-z, 0-9, _');
            return false;
          }
        }

        function validatePassword (inputPassword, minLength, maxLength) {
          var passwordLength = inputPassword.value.length;
          if (passwordLength === 0 || passwordLength < minLength || passwordLength > maxLength) {
            addErrorClass(formGroupForPassword, "Password should not be empty / length be between " + minLength + " to " + maxLength + "!");
            return false;
          } else {
            passwordVal = inputPassword.value;
            return true;
          }
        }

        if (validateEmail(inputEmail)) {
          if (validateUsername(inputUsername)) {
            if (validatePassword(inputPassword, minLength, maxLength)) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      }

      var resultOfValidation = validationForm(emailDOM, usernameDOM, passwordDOM, 7, 12);

      if (resultOfValidation) {

        var dataForSendToServer = {
          email: emailVal,
          username: usernameVal,
          password: passwordVal
        };

        $.ajax({
          url: '/register',
          method: 'POST',
          data: JSON.stringify(dataForSendToServer),
          contentType: "application/json; charset=utf-8",
          success: function (data) {

            if (formGroupForEmail.classList.contains("has-error")) {
              deleteErrorClass(formGroupForEmail, emailDOM, containerForRenderErrorEmail);
            }
            if (formGroupForUsername.classList.contains("has-error")) {
              deleteErrorClass(formGroupForUsername, usernameDOM, containerForRenderErrorUsername);
            }
            if (formGroupForPassword.classList.contains("has-error")) {
              deleteErrorClass(formGroupForPassword, passwordDOM, containerForRenderErrorPassword);
            }

            addSuccessClass([formGroupForEmail, formGroupForUsername, formGroupForPassword])

            // handler modal window

            $('#myModalRegister').on('show.bs.modal', function() {
              var $modal = $(this);
              $modal.find('.modal-body > p').html("You are registered. Welcome to my blog, dear " + data.username + "!");
            });
            $('#myModalRegister').modal('show');
            setTimeout(function () {
              $('#myModalRegister').modal('hide');
              if (data.isAdmin) {
                window.location.href = "/admin#/posts";
              } else {
                window.location.href = "/";
              }
            }, 2000);
          },
          error: function (jqXHR) {
            if (jqXHR.status === 409) {
              var error = JSON.parse(jqXHR.responseText);
              addErrorClass(formGroupForUsername, error);
            }
          }
        });
      }
    });
  }
}
