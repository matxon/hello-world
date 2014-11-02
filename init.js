/*
 * Mysql-де test базасы жоқ болған жағдайда оны жаңадан құрады
 */

var mysqldb = require('./mysqldb');

var options = {
  host: 'localhost',
  user: 'matxon',
  database: 'test',
  password: ''
};
var tables = [ 
	{ 
		name: 'users',
		query: '(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30) NOT NULL, pass VARCHAR(30) NOT NULL)'
	},
	{
		name: 'charges',
		query: '(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30) NOT NULL, ed INT NOT NULL)'
	},
	{
		name: 'ed',
		query: '(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ed VARCHAR(6) NOT NULL)'
	},
	{
		name: 'supply',
		query: '(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, pdate DATE NOT NULL, contragentid INT NOT NULL)'
	},
	{	
		name: 'supply_table',
		query: '(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, charges VARCHAR(30) NOT NULL, qty INT NOT NULL)'
	},
	{
		name: 'realization',
		query: '(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, pdate DATE NOT NULL, employeeid INT NOT NULL)'
	},
	{
		name: 'realization_table',
		query: '(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, charges VARCHAR(30) NOT NULL, qty INT NOT NULL)'
	},
	{
		name: 'employes',
		query: '(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(40) NOT NULL, post VARCHAR(20) NOT NULL)'
	}
];

// Mysql-ге қосылу
var testdb = new mysqldb( options );
var testerror = false;

//testdb.connect( function(err) {
//	if (err) {
		console.log( 'Please, in mysql "CREATE DATABASE TEST" ')
		// егер жоқ болса
//	}
//});

  for( var i = 0; i < tables.length; i++) {
    var query = 'CREATE TABLE IF NOT EXISTS ' + tables[i].name + ' ' + tables[i].query;
    testdb.query( query, function( err, data) {
    if ( err ) {
      console.log( err );
      return;
    }
      console.log( data );
    });
  }

testdb.end();
