var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();

// default options
app.use(fileUpload());

app.post('/:id', (req, res, next) =>{

  var id = req.params.id;

  if (!req.files) {
    return res.status(400).json({
      ok: false,
      mensaje: 'No selecciono nada',
      errors: {message: 'Debe de seleccionar un archivo'}
    })
  }

  // Obtener nombre de los archivos
  var archivo = req.files.file
  var imagen = req.files.image

  var nombreArchivo = `${id}-${new Date().getMilliseconds()}-${archivo.name}`;
  var nombreImagen = `${id}-${new Date().getMilliseconds()}-${imagen.name}`;

  var pathArchivo = `./uploads/users/${nombreArchivo}`;
  var pathImagen = `./uploads/users/${nombreImagen}`;

  archivo.mv(pathArchivo, err => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al mover archivo',
        error: err
      })
    }

    res.status(200).json({
      ok: true,
      mensaje: 'Archivo guardado correctamente'
    });

  });
  
  imagen.mv(pathImagen, err => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al mover archivo',
        error: err
      });
    }

    res.status(200).json({
      ok: true,
      mensaje: 'Archivo guardado correctamente'
    });

  });

});

module.exports = app;