var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/dono/animal', function(req, res, next) {
  var get = req.body;
  connection.query('SELECT * FROM dono_animal where idDono=(Select idDono from dono where RG="?")',get.RG, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.send(results)
  })
});

router.post('/dono/animal', function(req, res, next) {
  var post = req.body;
  connection.query('INSERT INTO dono_animal VALUES (SELECT max(idAnimal) FROM animal where Nome="?"),(SELECT idDono FROM dono where RG="?")', post.nomeAnimal,post.RG, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(201).send({message: "Animal vinculado ao dono com sucesso!"})
  })
});

router.delete('/dono/animal', function(req, res, next) {
  var del = req.body;
  connection.query('DELETE FROM dono_animal WHERE idDono=(SELECT idDono FROM dono where RG="?") AND idAnimal=(select idAnimal where Nome="?")', del.RG,del.nomeAnimal, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(201).send({message: "Animal vinculado ao dono com sucesso!"})
  })
});


module.exports = router;