var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/dono/animal/:Email', function(req, res, next) {
  var params = req.params.Email;
  
  connection.query('SELECT *, animal.Nome as Nome, raca.Nome as racaAnimal, tipo.Nome as tipoAnimal FROM dono_animal INNER JOIN animal USING (idAnimal) INNER JOIN tipo using (idTipo) INNER JOIN raca using (idRaca) WHERE idDono=(SELECT idDono from dono where Email=?)', params, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.send(results)
  })
});

router.get('/animal/dono/:idAnimal', function(req, res, next) {
  var params = req.params.idAnimal;
  console.log(params);
  
  connection.query('SELECT * FROM dono_animal INNER JOIN dono USING (idDono) where idAnimal=?', params, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err)
      }
    res.send(results)
  })
});

router.post('/dono/animal', function(req, res, next) {
  var post = [req.body.Nome, req.body.Email];
  connection.query('INSERT INTO dono_animal (idAnimal, idDono) VALUES ((SELECT max(idAnimal) FROM animal WHERE Nome=?),(SELECT idDono FROM dono where Email=?))', post, function (err, results, fields) {
      if (err) {  
        res.status(500).send(err);
        return console.log(err)
      }
    res.status(201).send({message: "Animal vinculado ao dono com sucesso!"})
  })
});

// router.delete('/dono/animal', function(req, res, next) {
//   var del = req.body;
//   connection.query('DELETE FROM dono_animal WHERE idDono=(SELECT idDono FROM dono where RG=?) AND idAnimal=(select idAnimal where Nome=?)', del.RG,del.nomeAnimal, function (err, results, fields) {
//       if (err) {
//         res.status(500).send(err);
//         return console.log(err)
//       }
//     res.status(201).send({message: "Animal vinculado ao dono com sucesso!"})
//   })
// });


module.exports = router;