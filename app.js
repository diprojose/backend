// Requires
var PORT = process.env.PORT || 3000;
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importar rutas
var appRoutes = require('./routes/app');
var loginRoutes = require('./routes/login');
var uploadRoutes = require('./routes/upload');
var cityRoutes = require('./routes/citys');
var userRoutes = require('./routes/user');

// Conexión a la base de datos
mongoose.connection.openUri('mongodb+srv://dipro:Dipro1790!@dipro0-w0h51.gcp.mongodb.net/test?retryWrites=true&w=majority', (err, res)=> {
  if (err) throw err;
  console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
})

// Rutas
app.use('/ciudad', cityRoutes);
app.use('/usuario', userRoutes);
app.use('/login', loginRoutes);
app.use('/upload', uploadRoutes);
app.use('/', appRoutes);

// Escuchar peticiones
app.listen(PORT, ()=> {
  console.log('express server corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', 'online');
})