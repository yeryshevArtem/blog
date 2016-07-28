var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./modules/app/routes/index');
var post = require('./modules/app/routes/post');
var login = require('./modules/app/routes/login');
var posts = require('./modules/api/routes/posts');
var debug = require('debug')('app4');

var app = express();

var params = {
  port: 8000,
  ip: '192.168.33.11'
};

var modelForAppModule = require('./modules/app/models-postgre/posts');
modelForAppModule.connect("postgres://root:12345678@localhost:5432/blog", function (err) {
  if (err) throw err;
});

[index, post, login].forEach(function (router) {
  router.configure({model: modelForAppModule});
});

var modelForApiModule = require('./modules/api/models-postgre/posts');
modelForApiModule.connect("postgres://root:12345678@localhost:5432/blog", function (err) {
  if (err) throw err;
});

posts.configure({model: modelForApiModule});

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
app.use(express.static(path.join(__dirname, '/modules/app/public')));

//for app module
app.use('/', index);
app.use('/', post);
app.use('/', login);

//for api module
app.use('/api', posts);

//for admin module
// app.use('/admin');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('showerror', {
      message: err.message,
      error: err
    });
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
