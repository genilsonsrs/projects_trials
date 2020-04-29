var conn = require('./../inc/db');
var express = require('express');
var router = express.Router();
var reservations = require('./../inc/reservations');
var contacts = require('./../inc/contacts');

/* GET home page. */
router.get('/', function (req, res, next) {

conn.query('SELECT * FROM tb_menus ORDER BY title', (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        title: 'Restaurante Saboroso!',
        menus: results,
        background: 'images/img_bg_1.jpg'
      });
    }
  });
});

router.get('/contacts', function (req, res, next) {

    contacts.render(req, res);

});

router.post('/contacts', function (req, res, next) {
  
  if (!req.body.name) {

    contacts.render(req, res, "Digite seu nome", null);

  } else if (!req.body.email) {

    contacts.render(req, res, "Digite seu email", null);

  } else if (!req.body.message) {

    contacts.render(req, res, "Digite uma mensagem", null);

  } else {

    contacts.save(req.body).then(results => {

      req.body = {};

      contacts.render(req, res, null, "Contato realizado com sucesso!");

    }).catch(err => {      

      contacts.render(req, res, err.message, null);

    })

  }

});

router.get('/menus', function (req, res, next) {
  conn.query('SELECT * FROM tb_menus ORDER BY title', (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.render('menus', {
        title: 'Menus | Restaurante Saboroso!',
        background: 'images/img_bg_1.jpg',
        menus: results,
        h1: 'Saboreie nosso menu!'
      });
    }
  });
});

router.post('/reservations', function (req, res, next) {

  if (!req.body.name) {

    reservations.render(req, res, "Digite seu nome", null);

  } else if (!req.body.email) {

    reservations.render(req, res, "Digite seu email", null);

  } else if (!req.body.people) {

    reservations.render(req, res, "Selecione um número de pessoas", null);

  } else if (!req.body.date) {

    reservations.render(req, res, "Selecione uma data válida", null);

  } else if (!req.body.time) {

    reservations.render(req, res, "Selecione um horário válido", null);

  } else {

    reservations.save(req.body).then(results => {

      req.body = {};

      reservations.render(req, res, null, "Reserva realizada com sucesso!");

    }).catch(err => {      

      reservations.render(req, res, err.message, null);

    })

  }

});

router.get('/reservations', function (req, res, next) {

  reservations.render(req, res);

});

router.get('/services', function (req, res, next) {
  res.render('services', {
    title: 'Serviços | Restaurante Saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!'
  });
});

module.exports = router;
