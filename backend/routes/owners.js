var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/dono', function(req, res, next) {
  connection.query('SELECT * FROM dono', function (err, results, fields) {
    if (err) {
      res.status(500).send(err);
      throw err
    }
    res.send(results)
  })
});

router.get('/dono/count', function(req, res, next) {
  connection.query('SELECT COUNT(*) as "num" FROM dono', function (err, results, fields) {
    if (err) {
      res.status(500).send(err);
      throw err
    }
    res.status(200).send(results[0])
  })
});

router.post('/dono', function(req, res, next) {
  var post = Object.keys(req.body).map(function(key) {
    return req.body[key];
  });

  connection.query('INSERT INTO dono (Nome, RG, UF, Email) VALUES (?, ?, ?, ?)', post, function (err, results, fields) {
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