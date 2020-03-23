var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var nivelesValidos = {
  values: ['NIVEL0', 'NIVEL1', 'NIVEL2', 'NIVEL3', 'NIVEL4', 'NIVEL5', 'NIVEL6', 'NIVEL7', 'NIVEL8', 'NIVEL9', 'NIVEL10', 'NIVEL11', 'NIVEL12'],
  message: '{VALUE} no es un rol permitido'
};

var userSchema = new Schema({

  cedula: { type: Number, unique: true, required: [true, 'Cedula requerida'] },
  email: { type: String, unique: true, required: [true, 'Correo requerido'] },
  region: { type: String, required: [true, 'Región requerida'] },
  password: { type: String, required: [true, 'Contraseña requerida'] }, 
  nivelCompletado: { type: String, required: false, default: 'NIVEL0' }
  
});

userSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'})

module.exports = mongoose.model('User', userSchema);