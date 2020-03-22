var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var app = express();

var Usuario = require('../models/user');

app.post('/', (req, res) => {

  var body = req.body;
  
  Usuario.findOne({cedula: body.cedula}, (err, usuarioDB) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al buscar usuario',
        error: err
      })
    }

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Credenciales incorrectas - email',
        error: err
      })
    }

    if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Credenciales incorrectas - password',
        error: err
      })
    }

    // Crear token
    usuarioDB.password = 'encriptada';
    var token = jwt.sign({ usuario: usuarioDB}, SEED, {expiresIn: 14400}); // 4 horas

    res.status(200).json({
      ok: true,
      usuario: usuarioDB,
      token: token,
      id: usuarioDB._id
    });
  });


})

module.exports = app;