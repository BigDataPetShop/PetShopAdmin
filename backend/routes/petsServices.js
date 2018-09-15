var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/animal/servico', function(req, res, next) {
  var get = req.body;
  connection.query('SELECT * FROM animal_servico where idAnimal=(Select idAnimal from animal where Nome="?")',get, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.send(results)
  })
});

router.post('/animal/servico', function(req, res, next) {
  var post = req.body;
  connection.query('INSERT INTO animal_servico VALUES (Select idAnimal from animal where Nome="?"),(Select idServico from servico where Nome="?"),0,?', post.nomeAnimal,post.nomeServico,post.agenda, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(201).send({message: "Servico vinculado ao animal com sucesso!"})
  })
});


router.put('/animal/servico', function(req, res, next) {
  var put = req.body;
  connection.query('UPDATE TABLE petshop_servico SET Preco=? where idPetshop=(Select idPetshop from petshop where Nome="?") and idServico=(Select idServico from servico where Nome="?")', post.Preco,post.nomePetshop,post.nomeServico, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(201).send({message: "Preco atualizado com sucesso!"})
  })
});

router.delete('/animal/servico', function(req, res, next) {
  var put = req.body;
  connection.query('DELETE FROM petshop_servico where idPetshop=(Select idPetshop from petshop where Nome="?") and idServico=(Select idServico from servico where Nome="?")', post.nomePetshop,post.nomeServico, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(201).send({message: "Servico removido do petshop com sucesso!"})
  })
});

module.exports = router;