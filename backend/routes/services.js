var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/servico', function(req, res, next) {
  connection.query('SELECT * FROM servico', function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.send(results)
  })
});

//o servico ja eh criado ao criar um servico no petshop atravez de trigger
// router.post('/servico', function(req, res, next) {
//   var post = Object.keys(req.body).map(function(key) {
//     return req.body[key];
//   });

//   connection.query('INSERT INTO servico VALUES ?', post, function (err, results, fields) {
//       if (err) {
//         res.status(500).send(err);
//         return console.log(err);
//       }
//     res.status(201).send({message: "Servico cadastrado com sucesso!"})
//   })
// });

router.put('/servico', function(req, res, next) {
  var put = req.body;
  connection.query('UPDATE servico SET Nome=? WHERE idServico = ?', [put.Nome, put.idServico], function (err, results, fields) {
      if (err) {
        res.status(500).send(err);
        return console.log(err);
      }
    res.status(200).send({message: "Servico atualizado com sucesso!"})
  })
});


// router.delete('/servico', function(req, res, next) {
//   var del = req.body;
//   connection.query('DELETE FROM servico WHERE idServico = del', del, function (err, results, fields) {
//       if (err) {
//         res.status(500).send(err);
//         return console.log(err);
//       }
//     res.status(200).send({message: "Servico apagado com sucesso!"})
//   })
// });

module.exports = router;