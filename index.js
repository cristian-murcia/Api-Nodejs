'use strict'

var mongoose = require('mongoose'); //require: importa una dependencia
var app = require('./app');
var port = 3701;

mongoose.Promise = global.Promise; //pasa a ser una promesa global
mongoose.connect('mongodb://localhost:27017/Portafolio') //Connect: realiza una conexion a la BBDD  
    .then(() => {
        console.log('Se realizo la conexion a la base de datos');

        //Creacion de un servidor
        app.listen(port, () => {
            console.log('Servidor corriendo correctamente.');
        });

    })
    .catch(err => console.log(err));