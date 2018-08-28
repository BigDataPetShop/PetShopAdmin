var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/dono/pet', function(req, res, next) {
  connection.query('SELECT * FROM dono', function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.send(results)
  })
});

router.post('/dono', function(req, res, next) {
  var post = req.body;
  connection.query('INSERT INTO dono SET ?', post, function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(201).send({message: "Dono cadastrado com sucesso!"})
  })
});

router.put('/dono', function(req, res, next) {
  var put = req.body;
  connection.query('UPDATE dono SET ? WHERE RG = ?', [put, put.RG], function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send({message: "Dono atualizado com sucesso!"})
  })
});

router.delete('/dono', function(req, res, next) {
  var del = req.body;
  connection.query('DELETE FROM dono WHERE RG = ? AND Email = ?', [del.RG, del.Email], function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        throw err
      }
    res.status(200).send({message: "Dono apagado com sucesso!"})
  })
});

module.exports = router;