var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/tipo', function(req, res, next) {
  connection.query('SELECT * FROM tipo', function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.send(results)
  })
});

router.post('/tipo', function(req, res, next) {
  var post = req.body.Nome;
  connection.query('INSERT INTO tipo (Nome) VALUES (?)', post, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(201).send({message: "Tipo cadastrado com sucesso!"})
  })
});

router.put('/tipo', function(req, res, next) {
  var put = [req.body.novoNome, req.body.Nome];
  connection.query('UPDATE tipo SET Nome=? WHERE idTipo=(SELECT idTipo WHERE Nome=?)', put, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(200).send({message: "Tipo atualizado com sucesso!"})
  })
});

router.delete('/tipo', function(req, res, next) {
  var del = req.body.Nome;
  connection.query('DELETE FROM tipo WHERE idTipo = (SELECT idTipo WHERE Nome=?)', del, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(200).send({message: "Tipo apagado com sucesso!"})
  })
});

module.exports = router;