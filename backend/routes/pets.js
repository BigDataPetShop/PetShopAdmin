var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/animal', function(req, res, next) {
  connection.query('SELECT * FROM animal', function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.send(results)
  })
});

router.post('/animal', function(req, res, next) {
  var post = req.body;
  connection.query('INSERT INTO animal VALUES ?,(SELECT idRaca FROM raca where Nome="?"),(SELECT idTipo FROM tipo where Nome="?"),?,?; INSERT INTO dono_animal VALUES (SELECT max(idAnimal) FROM animal where Nome="?"),(SELECT idDono FROM dono where RG="?")',post.Nome,post.Raca,post.Tipo,post.Sexo,post.dataNascimento,post.Nome,post.RG , function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(201).send({message: "Animal cadastrado com sucesso!"})
  })
});

router.put('/animal', function(req, res, next) {
  var put = req.body;
  connection.query('UPDATE animal SET ? WHERE idAnimal = ?', put, put.idAnimal, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send({message: "Animal atualizado com sucesso!"})
  })
});

router.delete('/animal', function(req, res, next) {
  var del = req.body;
  connection.query('DELETE FROM animal WHERE idAnimal = ?', del.idAnimal, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send({message: "Animal apagado com sucesso!"})
  })
});

module.exports = router;