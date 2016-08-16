var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var pg = require('pg');
var session = require('express-session');
var pgSession = require('connect-pg-simple')(session); //session store
var bodyParser = require('body-parser');
var index = require('./modules/app/routes/index');
var post = require('./modules/app/routes/post');
var login = require('./modules/app/routes/login');
var register = require('./modules/app/routes/register');
var logout = require('./modules/app/routes/logout');
var loadUsers = require('./modules/app/middleware/loadUsers');
var postsAdmin = require('./modules/admin/routes/postsAdmin');
var posts = require('./modules/api/routes/posts');
var debug = require('debug')('app4');

var checkAuth = require('./modules/app/middleware/checkAuth');

var app = express();

var params = {
  port: 8000,
  ip: '192.168.33.11'
};
//posts model for app module
var modelForAppModulePosts = require('./modules/app/models-postgre/posts');
modelForAppModulePosts.connect("postgres://root:12345678@localhost:5432/blog", function (err) {
  if (err) throw err;
});

[index, post].forEach(function (router) {
  router.configure({model: modelForAppModulePosts});
});

//users model for app module
var modelForAppModuleUsers = require('./modules/app/models-postgre/users');
modelForAppModuleUsers.connect("postgres://root:12345678@localhost:5432/blog", function (err) {
  if (err) throw err;
});

[login, register].forEach(function (router) {
  router.configure({model: modelForAppModuleUsers});
});
// login.configure({model: modelForAppModuleUsers});

//posts model for api module
var modelForApiModulePosts = require('./modules/api/models-postgre/posts');
modelForApiModulePosts.connect("postgres://root:12345678@localhost:5432/blog", function (err) {
  if (err) throw err;
});

posts.configure({model: modelForApiModulePosts});

// view engine setup
app.set('port', process.env.PORT || params.port);
app.set('views', path.join(__dirname, '/modules/app/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  store: new pgSession({
    pg : pg,
    conString : "postgres://root:12345678@localhost:5432/blog",
  }),
  secret: "bruceWayne",
  resave: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

// app.use(express.static(path.join(__dirname, '/modules/app/public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/jquery", express.static(__dirname + '/public/jquery'));
app.use("/bootstrap", express.static(__dirname + '/public/bootstrap'));
app.use("/styles",  express.static(__dirname + '/public/stylesheets'));
app.use("/scripts", express.static(__dirname + '/public/javascripts'));
app.use("/images",  express.static(__dirname + '/public/images'));

//for app module
app.use(loadUsers);
app.use('/', index);
app.use('/', post);
app.use('/', login);
app.use('/', register);
app.use('/', logout);

//for api module
app.use('/api', posts);

//for admin module
app.use('/admin', checkAuth, postsAdmin); //checking on admin

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace

//There inserted all errors from other middleware
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    if (err.status === 403) {
      res.statusCode = err.status;
      res.end(JSON.stringify(err.message));
    } else {
      // res.statusCode = err.status;
      // res.end(JSON.stringify(err.message));
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = app.listen(app.get('port'), params.ip, function() {
  debug('Express server listening on port ' + server.address().port);
});
