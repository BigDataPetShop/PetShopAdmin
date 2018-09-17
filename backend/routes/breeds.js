var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/raca', function(req, res, next) {
  connection.query('SELECT * FROM raca', function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send(results)
  })
});

router.post('/raca', function(req, res, next) {
  var post = req.body;
  connection.query('INSERT INTO raca VALUES ?', post, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(201).send({message: "Raca cadastrado com sucesso!"})
  })
});

router.put('/raca', function(req, res, next) {
  var put = req.body;
  connection.query('UPDATE raca SET ? WHERE idRaca=(SELECT idRaca where nome like "?")', put, put.Nome, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send({message: "Raca atualizado com sucesso!"})
  })
});

router.delete('/raca', function(req, res, next) {
  var del = req.body;
  connection.query('DELETE FROM raca WHERE idRaca = (SELECT idRaca where nome like "?")', del.Nome, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send({message: "Raca apagado com sucesso!"})
  })
});

module.exports = router;