/*
 * Mysql-де test базасы жоқ болған жағдайда оны жаңадан құрады
 */

var options = {
	host: 'localhost',
	user: 'root',
	pass: '123',
	  db: 'test'
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
//
// егер жоқ болса

console.log('CREATE DATABASE IF NOT EXISTS ' + options.db);
for( var i = 0; i < tables.length; i++) {
	console.log('CREATE TABLE IF NOT EXISTS ' + tables[i].name + ' ' + tables[i].query);
}
