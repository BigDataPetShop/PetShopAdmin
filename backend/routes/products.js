var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/produto', function(req, res, next) {
  connection.query('SELECT * FROM produto', function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.send(results)
  })
});

router.get('/produto/:idProduto', function(req, res, next) {
  var params = req.params.idProduto;
  connection.query('SELECT * FROM produto WHERE idProduto = ?', params, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.send(results)
  })
});

router.post('/produto', function(req, res, next) {
  var post = req.body;
  connection.query('INSERT INTO produto VALUES ?', post, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(201).send({message: "Produto cadastrado com sucesso!"})
  })
});

router.put('/produto', function(req, res, next) {
  var put = req.body;
  connection.query('UPDATE produto SET ? WHERE idProduto = ?', [put, put.idProduto], function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send({message: "Produto atualizado com sucesso!"})
  })
});

router.delete('/produto', function(req, res, next) {
  var del = req.body;
  connection.query('DELETE FROM produto WHERE idProduto = ?', [del.idProduto], function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send({message: "Produto apagado com sucesso!"})
  })
});

module.exports = router;