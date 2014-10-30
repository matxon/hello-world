// express --version 
// 4.9.4

var express = require('express'),
    routes = require('./routes/index'); //express.Router(),
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

// configure
app.set('port', process.env.PORT || 3000 );
// express-те турып jade движогын пайдалану ушін керек
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// middleware
app.use(bodyParser({ uploadDir: __dirname + '/files', keepExtensions: true }));
app.use(methodOverride());

app.use(express.static(__dirname + '/public')); 
app.use('/', routes);

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


var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
