// express --version 
// 4.9.4

var express = require('express'),
    path = require('path'),
    mysqldb = require('./mysqltest'),
    router = express.Router(),
    http = require('http');

var options = {
  host: 'localhost',
  user: 'matxon',
  database: 'test',
  password: ''
};

var app = express();
var testdb = new mysqldb( options );

testdb.connect( function( err ) {
  if (err) console.log( "/db connect: " + err.stack ); 
});

// configure
app.set('port', process.env.PORT || 3000 );
// express-те турып jade движогын пайдалану ушін керек
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.set('public', __dirname + '/node_modules/bootstrap/dist'); 

// middleware
//app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/', router);

// route
router.get( '/', function( req, res ) {
  res.render( "home", { title: "My App with Express and jade." } ); 
});

router.get( '/db', function( req, res ) {

  var query = 'select * from users';
  testdb.query( query, function( err, data ) {
    if (err) {
      res.send( "/db.query error" );
      return;
    } 
    res.render( 'data', {tabl:data} );
  });
}); 

http.createServer( app ).listen( app.get('port'), function() {
  console.log( "Express server listening on port " + app.get( 'port' ));
/*});
*/

//var server = app.listen(app.get('port'), function() {
//  console.log('Express server listening on port ' + server.address().port);
});
