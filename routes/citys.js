var express = require('express');
var bcrypt = require('bcryptjs');

var app = express();

var Ciudad = require('../models/city');

// ================================
// Obtener todas las ciudades
// ================================

app.get('/', (req, res, next) =>{
  Ciudad.find({}, 'city puntos usuarios')
    .exec(
    (err, citys)=> {
      if (err) {
        return res.status(200).json({
          ok: false,
          mensaje: 'Error cargando usuarios',
          error: err
        })
      }

      res.status(200).json({
        ok: true,
        citys: citys
      })

  });
});

// ================================
// Crear nueva ciudad
// ================================

app.post('/', (req, res)=> {

  var body = req.body;
  var city = new Ciudad({
    city: body.ciudad,
  });

  city.save((err, ciudadGuardada) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error creando ciudad',
        error: err
      })
    }

    res.status(201).json({
      ok: true,
      ciudad: ciudadGuardada
    });

  });
});


module.exports = app;