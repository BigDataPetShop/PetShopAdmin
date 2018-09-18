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
    connection.query('CREATE OR REPLACE VIEW petshopSum AS SELECT SUM(Preco) AS num, Nome FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) INNER JOIN petshop USING (idPetshop) WHERE Concluido=1 GROUP BY idPetshop', function (err, results, fields) {
      if (err) throw err;
    });

    connection.query('CREATE TEMPORARY TABLE animal_top5 SELECT *, IFNULL(SUM(Preco), 0.0) as receita, animal.Nome as nomeAnimal FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) INNER JOIN animal USING (idAnimal) WHERE Vivo=1 group by idAnimal order by receita DESC limit 5', function (err, results, fields) {
      if (err) throw err;
    });
});

module.exports = connection;
