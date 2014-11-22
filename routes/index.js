var express = require('express');
var mysqldb = require('../mysqldb'); 
var router = express.Router();

var options = {
  host: 'localhost',
  user: 'matxon',
  database: 'test',
  password: '123'
};

//------------------------------------------------------------------------
var testdb = new mysqldb( options );

testdb.connect( function( err ) {
  if (err) console.log( "/db connect: " + err.stack ); 
});

// route
//------------------------------------------------------------------------
router.get( '/', function( req, res ) {
  res.render( "home", { title: "Мәліметтер базасы", active: 0} ); 
});

//------------------------------------------------------------------------
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

//------------------------------------------------------------------------
router.get('/geted', function(req, res) {
  var query = 'select * from ed';
  testdb.query( query, function( err, data ) {
    if (err) { res.send( "error"); return };
    var temp = [];
    for(var i=0; i<data.length; i++) {
      temp.push( { label: data[i]['ed'], value: data[i]['id'] } );
    }
    res.send(temp);
  });
});

//------------------------------------------------------------------------
router.get( '/users', function( req, res ) {
  var th = [ 'id', 'Қолданушының аты','паролі'];
  res.render( 'users', {title: 'Қолданушылар', active: 1, tabl: {}, th: th} );
});

//------------------------------------------------------------------------
router.get( '/supply', function( req, res ) {
  res.render( 'supply', {title: 'Жаңа түсім', active: 3} );
});

//------------------------------------------------------------------------
router.get( '/realization', function( req, res ) {
  res.render( 'realization', {title: 'Кетуін тіркеу', active: 4} );
});

//------------------------------------------------------------------------
router.get( '/api/users/delete', function( req, res ) {

  var query = 'delete from users where id=' + req.param('id');

  testdb.query( query, function( err, data ) {
    if (err) {
      console.log( " /API/USERS/DELETE ", err );
      res.send( "/db.query error" );
      return;
    } 
    res.send( data );
    console.log( data );
  });
});
//------------------------------------------------------------------------
router.get( '/api/users', function( req, res ) {

  var query = 'select * from users';

  testdb.query( query, function( err, data ) {
    if (err) {
      console.log( " /API/USERS ", err );
      res.send( "/db.query error" );
      return;
    } 
    res.send( data );
    console.log( data );
  });
});
//------------------------------------------------------------------------
router.post( '/api/users', function( req, res ) {

  var query = 'insert into users (name, pass) values ("' + 
    req.param('name') + '","' + req.param('pass') + '")';

  console.log( query );

  testdb.query( query, function( err, data ) {
    if (err) {
      console.log( err );
      return;
    } 
    console.log( data );
    res.send( { id: data.insertId, name: req.param('name'), pass: req.param('pass') } );
  }); 
}); 

//------------------------------------------------------------------------
router.post('/fileupload', function( req, res ) {
  console.log( req.files );
  res.send( 'ok' );
});

module.exports = router;
