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
  connection.query('SELECT *, petshop.Nome as nomePetshop, servico.Nome as nomeServico,animal.Nome as nomeAnimal FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) INNER JOIN petshop USING (idPetshop) INNER JOIN servico USING (idServico) INNER JOIN animal USING (idAnimal) WHERE Concluido=0', function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(200).send(results)
  })
});

//Temporary Table
router.get('/animal/servico/top5', function(req, res, next) {
  connection.query('SELECT nomeAnimal, Preco, nomeRaca, nomeTipo FROM animal_top5', function (err, results, fields) {
    if (err) {
      res.status(500).send(err);
      return console.log(err);
    }
    res.status(200).send(results)
  });
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

//Stored function
router.get('/animal/servico/sum/:idAnimal', function(req, res, next) {
  var params = req.params.idAnimal;
  connection.query('SELECT sumServices(1,?) as num', params, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(200).send(results[0])
  })
});

//Substituido pela funcao sumServices
// router.get('/animal/servico/sum/:idAnimal', function(req, res, next) {
//   var params = req.params.idAnimal;
//   connection.query('SELECT IFNULL(SUM(Preco), 0.0) as num FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) WHERE Concluido=1 and idAnimal=?', params, function (err, results, fields) {
//       if (err) {
//         res.status(500).send(err);
//         return console.log(err);
//       }
//     res.status(200).send(results[0])
//   })
// });

//View
router.get('/animal/servico/sum/petshop/all', function(req, res, next) {
  connection.query('SELECT * FROM petshopSum', function(err, results, fields) {
    if (err) {
      res.status(500).send(err);
      return console.log(err);
    }
    res.status(200).send(results)
  })
});

router.get('/animal/servico/sum/petshop/:idPetshop', function(req, res, next) {
  var params = req.params.idPetshop;
  connection.query('SELECT IFNULL(SUM(Preco), 0.0) as num FROM animal_servico INNER JOIN petshop_servico USING (idPetshopServico) WHERE Concluido=1 and idPetshop=?', params, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(200).send(results[0])
  })
});

//sem testar
// Front: busca petshop por nome (seleciona e pega o idPetshop), busca serviços (seleciona e pega o idServiço)
router.post('/animal/servico', function(req, res, next) {
  var post = [req.body.idAnimal, req.body.idPetshopServico, req.body.Agenda];
  connection.query('INSERT INTO animal_servico (idAnimal, idPetshopServico, Concluido, Agenda) VALUES (?, ?, 0, ?)', post, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(201).send({message: "Servico vinculado ao animal com sucesso!"})
  })
});

router.put('/animal/servico/close', function(req, res, next) {
    var put = [req.body.idAnimalServico];
    connection.query('UPDATE animal_servico SET Concluido=1 WHERE idAnimalServico=? ', put, function (err, results, fields) {
        if (err) {
          res.status(500).send(err);
          return console.log(err);
        }
      res.status(201).send({message: "Servico concluido com sucesso!"})
    })
  });


router.delete('/animal/servico', function(req, res, next) {
  var del = [req.body.idAnimalServico];
  connection.query('DELETE FROM animal_servico WHERE idAnimalServico=?', del, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(201).send({message: "Servico removido do animal com sucesso!"})
  })
});

module.exports = router;