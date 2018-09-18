var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/petshop/servico/:idPetshop', function(req, res, next) {
  var params = req.params.idPetshop;
  connection.query('SELECT *, petshop.nome as nomePetshop, servico.Nome as nomeServico FROM petshop_servico INNER JOIN petshop USING (idPetshop) INNER JOIN servico USING (idServico) WHERE idPetshop=?', params, function (err, results, fields) {
    if (err) {
      res.status(500).send(err);
      return console.log(err);
    }
    res.send(results)
  });
});

router.get('/petshop/servico/', function(req, res, next) {
  var params = req.params.idPetshop;
  connection.query('SELECT * FROM petshop_servico', function (err, results, fields) {
    if (err) {
      res.status(500).send(err);
      return console.log(err);
    }
    res.send(results)
  });
});

router.post('/petshop/servico', function(req, res, next) {
  var post_servico = [req.body.nomeServico];
  var post_servico_petshop = [req.body.idPetshop, req.body.nomeServico, req.body.Preco]
  connection.query('INSERT INTO servico (Nome) VALUES (?)', post_servico, function (err, results, fields) {
    if (err) {
      console.log("DEU ERRO NO PRIMEIRO");
      
      res.status(500).send(err);
      return console.log(err);
    }
    connection.query('INSERT INTO petshop_servico (idPetshop, idServico, Preco) VALUES (?,(SELECT MAX(idServico) FROM servico WHERE Nome=?), ?)', post_servico_petshop, function (err, results, fields) {
      if (err) {
        console.log("DEU ERRO NO SEGUNDO");
        res.status(500).send(err);
        return console.log(err);
      }
    });
    res.status(201).send({message: "Servico cadastrado e vinculado ao petshop com sucesso!"});
  });
});

router.put('/petshop/servico', function(req, res, next) {
  var get = [req.body.nomeServico, req.body.idPetshop];
  connection.query('SELECT idPetshopServico FROM petshop_servico INNER JOIN servico USING (idServico) WHERE (Nome=? and idPetshop=?)', get, function (err, results, fields) {
    if (err) {
      res.status(500).send(err);
      return console.log(err);
    }
    var idPetshopServico = results[0].idPetshopServico;
    var put = [req.body.Preco, idPetshopServico];
    connection.query('UPDATE petshop_servico SET Preco=? WHERE idPetshopServico=?', put, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
      res.status(201).send({message: "Preco atualizado com sucesso!"});
    })
  })
});

//Transaction ou Stored Procedure
// router.delete('/petshop/servico', function(req, res, next) {
//   var del = [req.body.nomePetshop, req.body.nomeServico];
//   connection.query('DELETE FROM petshop_servico WHERE idPetshop=? and idServico=(SELECT idServico FROM servico WHERE Nome=?)', del, function (err, results, fields) {
//     if (err) {
//       res.status(500).send(err);
//       return console.log(err);
//     }
//     res.status(201).send({message: "Servico removido do petshop com sucesso!"});
//   })
// });

module.exports = router;