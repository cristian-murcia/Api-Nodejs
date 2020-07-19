'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({ //Se crea el modelo de datos a guardar en la colección.
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});

module.exports = mongoose.model('Project', ProjectSchema); //Se exporta el modulo con el modelo de mongo y coleccion.