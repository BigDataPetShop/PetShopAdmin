var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/animal/servico', function(req, res, next) {
  connection.query('SELECT * FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) INNER JOIN petshop USING (idPetshop) INNER JOIN servico USING (idServico)', function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send(results)
  })
});

router.get('/animal/servico/pending', function(req, res, next) {
  connection.query('SELECT *, petshop.Nome as nomePetshop, servico.Nome as nomeServico FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) INNER JOIN petshop USING (idPetshop) INNER JOIN servico USING (idServico) WHERE Concluido=0', function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send(results)
  })
});

router.get('/animal/servico/pending/:idAnimal', function(req, res, next) {
  var params = req.params.idAnimal;
  connection.query('SELECT *, petshop.Nome as nomePetshop, servico.Nome as nomeServico FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) INNER JOIN petshop USING (idPetshop) INNER JOIN servico USING (idServico) WHERE Concluido=0 and idAnimal=?', params, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send(results)
  })
});

router.get('/animal/servico/complete/:idAnimal', function(req, res, next) {
  var params = req.params.idAnimal;
  connection.query('SELECT *, petshop.Nome as nomePetshop, servico.Nome as nomeServico FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) INNER JOIN petshop USING (idPetshop) INNER JOIN servico USING (idServico) WHERE Concluido=1 and idAnimal=?', params, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send(results)
  })
});


router.get('/animal/servico/sum/petshop/:idPetshop', function(req, res, next) {
  connection.query('SELECT SUM(Preco) as num, petshop.Nome from animal_servico INNER JOIN petshop_servico USING (idPetshopServico) inner join petshop using (idPetshop) WHERE Concluido=1 group by idPetshop', function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send(results[0])
  })
});

router.get('/animal/servico/sum/:idAnimal', function(req, res, next) {
  var params = req.params.idAnimal;
  connection.query('SELECT SUM(Preco) as num FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) where Concluido=1 and idAnimal=?', params, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send(results[0])
  })
});

router.get('/animal/servico/sum/servico/:idServico', function(req, res, next) {
  connection.query('SELECT SUM(Preco) as num, servico.Nome as nomeServico FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) inner join servico using (idServico) where Concluido=1 group by idServico', function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send(results[0])
  })
});

router.post('/animal/servico', function(req, res, next) {
  var post = req.body;
  connection.query('INSERT INTO animal_servico (idAnimal,idPetshopServico, Concluido,Agenda) VALUES ((Select idAnimal from animal where Nome=?),(Select idServico from servico where Nome=?),0,?)', post.nomeAnimal,post.nomeServico,post.agenda, function (err, results, fields) {
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