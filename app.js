'use strict'

// Requires
var express = require('express');
var bodyParser = require('body-parser');

// Ejecutar Express
var app = express();

// Cargar archivos de rutas
var user_routes = require('./routes/user');
var topic_routes = require('./routes/topic');
var comment_routes = require('./routes/comment');

// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Reescribir Rutas
app.use('/api', user_routes); //hace de middleware para añadir/api delante de cada ruta del archivo que se carga.
app.use('/api', topic_routes); 
app.use('/api', comment_routes); 


//Exportar el módulo
module.exports = app;