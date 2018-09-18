var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/petshop', function(req, res, next) {
  connection.query('SELECT * FROM petshop', function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.send(results)
  })
});

router.post('/petshop', function(req, res, next) {
  var post = Object.keys(req.body).map(function(key) {
    return req.body[key];
  });
  connection.query('INSERT INTO petshop (Nome,Endereco) VALUES (?,?)', post, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(201).send({message: "Petshop cadastrado com sucesso!"})
  })
});

router.put('/petshop', function(req, res, next) {
  var put = req.body;
  connection.query('UPDATE petshop SET ? WHERE idPetshop=?', [put, put.idPetshop], function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(200).send({message: "Petshop atualizado com sucesso!"})
  })
});

router.delete('/petshop', function(req, res, next) {
  var del = req.body;
  connection.query('DELETE FROM petshop WHERE idPetshop=?', del.idPetshop, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(200).send({message: "Petshop apagado com sucesso!"})
  })
});

module.exports = router;