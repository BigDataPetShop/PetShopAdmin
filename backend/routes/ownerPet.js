var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/dono/animal/:RG', function(req, res, next) {
  var params = req.params.RG;
  
  connection.query('SELECT *, animal.Nome as Nome, raca.Nome as racaAnimal, tipo.Nome as tipoAnimal FROM dono_animal INNER JOIN animal USING (idAnimal) INNER JOIN tipo using (idTipo) INNER JOIN raca using (idRaca) WHERE idDono=(SELECT idDono from dono where RG=?)', params, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.send(results)
  })
});

router.get('/dono/animal/dono/:idAnimal', function(req, res, next) {
  var params = req.params;
  connection.query('SELECT * FROM dono_animal INNER JOIN dono USING (idDono) where idAnimal=?', params, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.send(results)
  })
});

router.post('/dono/animal', function(req, res, next) {
  var post = req.body;
  connection.query('INSERT INTO dono_animal (idAnimal,idDono) VALUES ((SELECT max(idAnimal) FROM animal where Nome=?),(SELECT idDono FROM dono where RG=?))', post.nomeAnimal,post.RG, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(201).send({message: "Animal vinculado ao dono com sucesso!"})
  })
});

router.delete('/dono/animal', function(req, res, next) {
  var del = req.body;
  connection.query('DELETE FROM dono_animal WHERE idDono=(SELECT idDono FROM dono where RG=?) AND idAnimal=(select idAnimal where Nome=?)', del.RG,del.nomeAnimal, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(201).send({message: "Animal vinculado ao dono com sucesso!"})
  })
});


module.exports = router;