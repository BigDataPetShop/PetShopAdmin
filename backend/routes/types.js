var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/tipo', function(req, res, next) {
  connection.query('SELECT * FROM tipo', function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.send(results)
  })
});

router.post('/tipo', function(req, res, next) {
  var post = req.body;
  connection.query('INSERT INTO tipo VALUES ?',post, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(201).send({message: "tipo cadastrado com sucesso!"})
  })
});

router.put('/tipo', function(req, res, next) {
  var put = req.body;
  connection.query('UPDATE tipo SET ? WHERE idTipo=(SELECT idTipo where nome like "?")', put, put.Nome, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send({message: "tipo atualizado com sucesso!"})
  })
});

router.delete('/tipo', function(req, res, next) {
  var del = req.body;
  connection.query('DELETE FROM tipo WHERE idTipo = (SELECT idTipo where nome like "?")', del.Nome, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send({message: "tipo apagado com sucesso!"})
  })
});

module.exports = router;