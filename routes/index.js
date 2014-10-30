var express = require('express');
var mysqldb = require('../mysqldb'); 
var router = express.Router();

var options = {
  host: 'localhost',
  user: 'matxon',
  database: 'test',
  password: '123'
};

var testdb = new mysqldb( options );

testdb.connect( function( err ) {
  if (err) console.log( "/db connect: " + err.stack ); 
});

// route
router.get( '/', function( req, res ) {
  res.render( "home", { title: "Мәліметтер базасы", active: 0} ); 
});

router.get( '/db', function( req, res ) {

  var query = 'select * from users';
  testdb.query( query, function( err, data ) {
    if (err) {
      res.send( "/db.query error" );
      return;
    } 
    res.render( 'data', {title: 'Қолданушылар', active: 1, tabl: data} );
  });
}); 

router.post('/fileupload', function( req, res ) {
  console.log( req.files );
  res.send( 'ok' );
});

module.exports = router;
