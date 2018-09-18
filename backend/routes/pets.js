var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/animal', function(req, res, next) {
  connection.query('SELECT *, animal.Nome as Nome,raca.Nome as nomeRaca, tipo.Nome as nomeTipo, animal.Sexo, animal.dataNascimento FROM animal INNER JOIN raca USING (idRaca) INNER JOIN tipo USING (idTipo)', function (err, results, fields) {
    if (err) {
      res.status(500).send(err);
      return console.log(err);
    }
    res.send(results)
  })
});

router.get('/animal/vivo', function(req, res, next) {
  connection.query('SELECT *, animal.Nome as Nome,raca.Nome as nomeRaca, tipo.Nome as nomeTipo, animal.Sexo, animal.dataNascimento FROM animal INNER JOIN raca USING (idRaca) INNER JOIN tipo USING (idTipo) WHERE Vivo=1', function (err, results, fields) {
    if (err) {
      res.status(500).send(err);
      return console.log(err);
    }
    res.send(results)
  })
});

router.post('/animal', function(req, res, next) {
  var post_dono_animal = [req.body.Nome, req.body.Email]
  var post = Object.keys(req.body).map(function(key) {
    return req.body[key];
  });

  try {
    connection.beginTransaction(function(err) {
      if (err) { console.log(err); }
      connection.query('INSERT INTO animal (Nome, idRaca, idTipo, Sexo, dataNascimento, Vivo) VALUES (?,?,?,?,?, 1)', post, function (error, results, fields) {
        if (error) {
          return connection.rollback(function() {
            res.status(500).send({message: "Não foi possível cadastrar"});
            return console.log(err);
          });
        }
        console.log('Post ' + results.insertId + ' added');
        connection.query('INSERT INTO dono_animal (idAnimal,idDono) VALUES ((SELECT max(idAnimal) FROM animal where Nome=?), (SELECT idDono FROM dono where Email=?))', post_dono_animal, function (error, results, fields) {
          if (error) {
            return connection.rollback(function() {
              res.status(500).send({message: "Não foi possível cadastrar"});
              return console.log(error);
            });
          }
          connection.commit(function(err) {
            if (err) {
              return connection.rollback(function() {
                res.status(500).send({message: "Não foi possível cadastrar"});
                return console.log(err);
              });
            } else {
              console.log('success!');
              res.status(201).send({message: "Animal cadastrado com sucesso!"})
            }
          });
        });
      });
    });
  } catch (error) {
    res.status(500).send({message: "Erro interno de servidor"});
    return console.log(error);;
  }
});

router.put('/animal', function(req, res, next) {
  var put = req.body;
  connection.query('UPDATE animal SET ? WHERE idAnimal = ?', [put, put.idAnimal], function (err, results, fields) {
    if (err) {
      res.status(500).send(err);
      return console.log(err);
    }
    res.status(200).send({message: "Animal atualizado com sucesso!"})
  })
});

router.put('/animal/morto', function(req, res, next) {
  var put = req.body.idAnimal;
  
  connection.query('UPDATE animal SET Vivo=0 WHERE idAnimal = ?', put, function (err, results, fields) {
    if (err) {
      res.status(500).send(err);
      return console.log(err);
    }
    res.status(200).send({message: "Animal atualizado com sucesso!"})
  })
});


// router.delete('/animal', function(req, res, next) {
//   var del = req.body;
//   connection.query('DELETE FROM animal WHERE idAnimal = ?', del.idAnimal, function (err, results, fields) {
//     if (err) {
//       res.status(500).send(err);
//       return console.log(err)
//     }
//     res.status(200).send({message: "Animal apagado com sucesso!"})
//   })
// });

module.exports = router;