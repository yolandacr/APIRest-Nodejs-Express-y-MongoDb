'use strict'

// Requires
var express = require('express');
var bodyParser = require('body-parser');

// Ejecutar Express
var app = express();

// Cargar archivos de rutas
var user_routes = require('./routes/user');
var topic_routes = require('./routes/topic');

// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// CORS

// Reescribir Rutas
app.use('/api', user_routes); //hace de middleware para añadir/api delante de cada ruta del archivo que se carga.
app.use('/api', topic_routes); 


//Exportar el módulo
module.exports = app;