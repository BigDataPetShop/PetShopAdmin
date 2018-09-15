//Database Integration
var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Tirt@258789',
  database : 'petshop'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;