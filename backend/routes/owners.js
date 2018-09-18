var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/dono', function(req, res, next) {
  connection.query('SELECT * FROM dono', function (err, results, fields) {
    if (err) {
      res.status(500).send(err);
      return console.log(err)
    }
    res.status(200).send(results)
  })
});

router.get('/dono/:Email', function(req, res, next) {
  var params = req.params.Email;
  connection.query('SELECT * FROM dono WHERE Email=?', params, function (err, results, fields) {
    if (err) {
      res.status(500).send(err);
      return console.log(err)
    }
    
    if (results[0]) {
      res.status(200).send(results[0]);
    } else {
      res.status(404).send({ message: "Nenhum dono encontrado" });
    }
  });
});

router.get('/dono/count', function(req, res, next) {
  connection.query('SELECT COUNT(*) as "num" FROM dono', function (err, results, fields) {
    if (err) {
      res.status(500).send(err);
      return console.log(err)
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
      return console.log(err)
    }
    res.status(201).send({message: "Dono cadastrado com sucesso!"})
  })
});

router.put('/dono', function(req, res, next) {
  var put = req.body;
  connection.query('UPDATE dono SET ? WHERE Email = ?', [put, put.Email], function (err, results, fields) {
    if (err) {
      res.status(500).send(err);
      return console.log(err)
    }
    res.status(200).send({message: "Dono atualizado com sucesso!"})
  })
});

router.delete('/dono', function(req, res, next) {
  var del = req.bodyEmail;
  connection.query('DELETE FROM dono WHERE Email = ?', del, function (err, results, fields) {
    if (err) {
      res.status(500).send(err);
      return console.log(err)
    }
    res.status(200).send({message: "Dono apagado com sucesso!"})
  })
});

module.exports = router;