//Database Integration
var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'senha',
  database : 'petshop'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;