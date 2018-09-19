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
    connection.query('CREATE OR REPLACE VIEW petshopSum AS SELECT SUM(Preco) AS num, Nome FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) INNER JOIN petshop USING (idPetshop) WHERE Concluido=1 GROUP BY idPetshop', function (err, results, fields) {
      if (err) throw err;
    });

    connection.query('CREATE TEMPORARY TABLE animal_top5 SELECT idPetshopServico,idAnimalServico,Concluido,Agenda,idServico,Sexo,dataNascimento,Vivo, IFNULL(SUM(Preco), 0.0) as Preco, animal.Nome as nomeAnimal, tipo.Nome as nomeTipo, raca.Nome as nomeRaca FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) INNER JOIN animal USING (idAnimal) INNER JOIN tipo USING (idTipo) INNER JOIN raca USING (idRaca) WHERE Vivo=1 AND Concluido=1 GROUP BY idAnimal order by Preco DESC limit 5', function (err, results, fields) {
      if (err) throw err;
    });
});

module.exports = connection;
