var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var userSchema = new Schema({

  cedula: { type: Number, unique: true, required: [true, 'Cedula requerida'] },
  email: { type: String, unique: true, required: [true, 'Correo requerido'] },
  region: { type: String, required: [true, 'Región requerida'] },
  password: { type: String, required: [true, 'Contraseña requerida'] }
  
});

userSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'})

module.exports = mongoose.model('User', userSchema);