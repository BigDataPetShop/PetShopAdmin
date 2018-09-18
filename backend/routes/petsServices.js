var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/animal/servico', function(req, res, next) {
  connection.query('SELECT * FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) INNER JOIN petshop USING (idPetshop) INNER JOIN servico USING (idServico)', function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(200).send(results)
  })
});

router.get('/animal/servico/pending', function(req, res, next) {
  connection.query('SELECT *, petshop.Nome as nomePetshop, servico.Nome as nomeServico FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) INNER JOIN petshop USING (idPetshop) INNER JOIN servico USING (idServico) WHERE Concluido=0', function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(200).send(results)
  })
});

router.get('/animal/servico/pending/:idAnimal', function(req, res, next) {
  var params = req.params.idAnimal;
  connection.query('SELECT *, petshop.Nome as nomePetshop, servico.Nome as nomeServico FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) INNER JOIN petshop USING (idPetshop) INNER JOIN servico USING (idServico) WHERE Concluido=0 and idAnimal=?', params, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(200).send(results)
  })
});

router.get('/animal/servico/complete/:idAnimal', function(req, res, next) {
  var params = req.params.idAnimal;
  connection.query('SELECT *, petshop.Nome as nomePetshop, servico.Nome as nomeServico FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) INNER JOIN petshop USING (idPetshop) INNER JOIN servico USING (idServico) WHERE Concluido=1 and idAnimal=?', params, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(200).send(results)
  })
});

router.get('/animal/servico/sum/:idAnimal', function(req, res, next) {
  var params = req.params.idAnimal;
  connection.query('SELECT SUM(Preco) as num FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) WHERE Concluido=1 and idAnimal=?', params, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(200).send(results[0])
  })
});

router.get('/animal/servico/sum/petshop/:idPetshop', function(req, res, next) {
  var params = req.params.idPetshop;
  connection.query('SELECT SUM(Preco) as num FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) WHERE Concluido=1 and idPetshop=?', params, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(200).send(results[0])
  })
});

//sem testar
router.post('/animal/servico', function(req, res, next) {
  var post = req.body;
  connection.query('INSERT INTO animal_servico (idAnimal ,idPetshopServico, Concluido, Agenda) VALUES ((SELECT idAnimal FROM animal WHERE Nome=?),(SELECT idServico FROM servico WHERE Nome=?),0,?)', post.nomeAnimal,post.nomeServico,post.agenda, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(201).send({message: "Servico vinculado ao animal com sucesso!"})
  })
});

//sem testar
router.put('/animal/servico', function(req, res, next) {
  var put = [req.body.Concluido,req.body.Agenda,req.body.nomePetshop,req.body.nomeServico,req.body.nomeAnimal];
  connection.query('UPDATE TABLE animal_servico SET Concluido=?, Agenda=? WHERE idPetshopServico=(SELECT idPetshopServico FROM petshop_servico WHERE idPetshop=(SELECT idPetshop WHERE nome=?) and idServico=(SELECT idServico FROM servico WHERE Nome=?)) and idAnimal=(SELECT idAnimal FROM animal WHERE Nome=?)', put, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(201).send({message: "Preco atualizado com sucesso!"})
  })
});

//sem testar
router.delete('/animal/servico', function(req, res, next) {
  var del = req.body;
  connection.query('DELETE FROM animal_servico WHERE idPetshopServico=(SELECT idPetshopServico FROM petshop_servico WHERE idPetshop=(SELECT idPetshop FROM petshop WHERE Nome="?") and idServico=(SELECT idServico FROM servico WHERE Nome="?")) and idAnimal=(SELECT idAnimal FROM animal WHERE Nome="?")', del.nomePetshop,del.nomeServico, del.nomeAnimal, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(201).send({message: "Servico removido do petshop com sucesso!"})
  })
});

module.exports = router;