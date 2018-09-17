var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/animal', function(req, res, next) {
  connection.query('SELECT animal.Nome as nomeAnimal,raca.Nome as nomeRaca, tipo.Nome as nomeTipo, animal.Sexo, animal.dataNascimento FROM animal INNER JOIN raca USING (idRaca) INNER JOIN tipo USING (idTipo)', function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.send(results)
  })
});

router.post('/animal', function(req, res, next) {
  var post = req.body;
  try{
    connection.query('START TRANSACTION')
    connection.query('INSERT INTO animal (Nome,idRaca,idTipo,Sexo,dataNascimento) VALUES (?,?,?,?,?); INSERT INTO dono_animal VALUES (SELECT max(idAnimal) FROM animal where Nome="?"),(SELECT idDono FROM dono where RG="?")',post.Nome,post.Raca,post.Tipo,post.Sexo,post.dataNascimento,post.Nome,post.RG)
    connection.query('COMMIT')
  }
  catch(err){
    connection.query('ROLLBACK')
  }
});

router.put('/animal', function(req, res, next) {
  var put = req.body;
  connection.query('UPDATE animal SET ? WHERE idAnimal = (SELECT idAnimal where nome like "?")', put, put.Nome, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send({message: "Animal atualizado com sucesso!"})
  })
});

router.delete('/animal', function(req, res, next) {
  var del = req.body;
  connection.query('DELETE FROM animal WHERE idAnimal = (SELECT idAnimal where nome like "?")', del.Nome, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send({message: "Animal apagado com sucesso!"})
  })
});

module.exports = router;