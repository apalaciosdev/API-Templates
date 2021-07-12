'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 2022;


mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_remplate', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('La conexión a la base de datos se ha realizado con éxito');

    // Crear servidor y ponerse a la escucha
    app.listen(port, () => {
        console.log('Ejecutando en puerto '+port);
    });
}); 