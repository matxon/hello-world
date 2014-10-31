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

router.get( '/charges', function( req, res ) {
  var query = 'select charges.*, ed.ed from charges, ed where charges.ed=ed.id';
  //var query = 'select * from users';
  testdb.query( query, function( err, data ) {
    if (err) {
      res.send( "/db.query error" );
      return;
    } 
    var th = [ 'id', 'Зарядтың атауы','өл.бірлік'];
    res.render( 'data', { title: 'Зарядтар', active: 2, tabl: data, th: th } );
  });
});

router.get('/geted', function(req, res) {
  var temp = [];
  var query = 'select * from ed';
  testdb.query( query, function( err, data ) {
    if (err) { res.send( "error"); return };
    for(var i=0; i<data.length; i++) {
      temp.push( { value: data[i]['ed'], id: data[i]['id'] } );
    }
    res.send(temp);
  });
});

router.get( '/users', function( req, res ) {

  var query = 'select * from users';
  testdb.query( query, function( err, data ) {
    if (err) {
      res.send( "/db.query error" );
      return;
    } 
    var th = [ 'id', 'Қолданушының аты','паролі'];
    res.render( 'users', {title: 'Қолданушылар', active: 1, tabl: data, th: th} );
  });
}); 

router.post('/fileupload', function( req, res ) {
  console.log( req.files );
  res.send( 'ok' );
});

module.exports = router;
