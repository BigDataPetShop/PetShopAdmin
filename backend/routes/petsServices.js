var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/animal/servico', function(req, res, next) {
  var get = req.body;
  connection.query('SELECT * FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) INNER JOIN petshop USING (idPetshop) INNER JOIN servico USING (idServico) where idAnimal=(Select idAnimal from animal where Nome="?")',get, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.send(results)
  })
});

router.post('/animal/servico', function(req, res, next) {
  var post = req.body;
  connection.query('INSERT INTO animal_servico VALUES (Select idAnimal from animal where Nome=?),(Select idServico from servico where Nome=?),0,?', post.nomeAnimal,post.nomeServico,post.agenda, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(201).send({message: "Servico vinculado ao animal com sucesso!"})
  })
});


router.put('/animal/servico', function(req, res, next) {
  var put = req.body;
  connection.query('UPDATE TABLE animal_servico SET Concluido=?,Agenda=? where idPetshopServico=(Select idPetshopServico from petshop_servico where idPetshop=(select idPetshop where nome=?) and idServico=(select idServico from servico where Nome=?)) and idAnimal=(Select idAnimal from animal where Nome=?)', put.Concluido,put.agenda,put.nomePetshop,put.nomeServico,put.nomeAnimal, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(201).send({message: "Preco atualizado com sucesso!"})
  })
});

router.delete('/animal/servico', function(req, res, next) {
  var del = req.body;
  connection.query('DELETE FROM animal_servico where idPetshopServico=(Select idPetshopServico from petshop_servico where idPetshop=(select idPetshop from petshop where Nome="?") and idServico=(select idServico from servico where Nome="?")) and idAnimal=(Select idAnimal from animal where Nome="?")', del.nomePetshop,del.nomeServico, del.nomeAnimal, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(201).send({message: "Servico removido do petshop com sucesso!"})
  })
});

module.exports = router;