var mysql = require('mysql');

//-------------------------------------- 
var mysqldb = function( opt ) {

  var connection = mysql.createConnection( opt );

  this.connect = function( callback ) {
    connection.connect( function( err ) {
      if ( err ) return callback( err );
    });
  };

  this.query = function( query, callback ) {
    connection.query( query, function( err, data ) {
      if ( err ) return callback( err );
      callback( null, data );
    });
  };

  this.end = function() {
    connection.end();
  };

  return this;
}
// --------------------------------------

module.exports =  mysqldb;
