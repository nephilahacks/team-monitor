var http      = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var sprints = require('./controllers/sprint');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('port', process.env.PORT || 3000);


/* ===============================================================
  STARTING SERVER
=============================================================== */

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.post('/sprints', function (req, res) {
  sprints.create(req.body, function (err, sprint){
    if (err) {
      res.send({'error': err});
    } else {
      res.send(sprint);
    }
  });
})

app.post('/sprints/:sprintid/vote', function (req, res) {
  var sprintid = req.params.sprintid;
  sprints.vote(sprintid, req.body, function (err, sprint){
    if (err) {
      res.send({'error': err});
    } else {
      res.send(sprint);
    }
  });
})

app.get('/sprints', function (req, res) {
  var sprintid = req.params.sprintid;
  sprints.all(function (err, sprints){
    if (err) {
      res.send({'error': err});
    } else {
      res.send(sprints);
    }
  });
})

app.get('/sprints/:sprintid', function (req, res) {
  var sprintid = req.params.sprintid;
  sprints.query({'index' : sprintid}, function (err, sprint){
    if (err) {
      res.send({'error': err});
    } else {
      res.send(sprint);
    }
  });
})

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
    res.render('error', {
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


module.exports = app;
