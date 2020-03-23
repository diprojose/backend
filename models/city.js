var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var citySchema = new Schema({

  city: { type: String, unique: true, required: [true, 'Ciudad requerido'] },
  puntos: { type: Number, required: false, default: '0' },
  usuarios: { type: Number, required: false, default: '0' }
  
});

citySchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'})

module.exports = mongoose.model('City', citySchema);