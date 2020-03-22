var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var app = express();

var Usuario = require('../models/user');

// ================================
// Obtener todos los usuarios
// ================================

app.get('/', (req, res, next) =>{
  Usuario.find({}, 'cedula email region')
    .exec(
    (err, users)=> {
      if (err) {
        return res.status(200).json({
          ok: false,
          mensaje: 'Error cargando usuarios',
          error: err
        })
      }

      res.status(200).json({
        ok: true,
        users: users
      })

  });
});

// ================================
// Crear nuevo usuario
// ================================

app.post('/', (req, res)=> {

  var body = req.body;
  var user = new Usuario({
    cedula: body.cedula,
    email: body.email,
    region: body.region,
    password: bcrypt.hashSync(body.password, 10)
  });

  user.save((err, usuarioGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error creando usuario',
        error: err
      })
    }

    res.status(201).json({
      ok: true,
      usuario: usuarioGuardado
    });

  });
});



// ================================
// Actualizar usuario
// ================================

app.put('/:id', (req, res)=> {
  var id = req.params.id;
  var body = req.body;
  Usuario.findById(id, (err, usuario) => {
    
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error buscando usuario',
        error: err
      })
    }
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error el usuario con el id: ' + id + ' no existe',
        error: err
      })
    }

    usuario.cedula = body.cedula;
    usuario.email = body.email;
    usuario.region = body.region;

    usuario.save((err, usuarioGuardado)=> {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error actualizando usuario',
          error: err
        })
      }

      usuarioGuardado.password = "encriptada"

      res.status(200).json({
        ok: true,
        usuario: usuarioGuardado
      });

    });

  });
});

// ================================
// Eliminar usuario
// ================================
app.delete('/:id', (req, res) =>{
  var id = req.params.id;
  Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error borrando usuario',
        error: err
      })
    }

    if (!usuarioBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: 'No existe un usuario con ese id',
        error: err
      })
    }

    res.status(200).json({
      ok: true,
      usuario: usuarioBorrado
    });

  });
});


module.exports = app;