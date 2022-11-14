'use strict'

// Requires
var express = require('express');
var bodyParser = require('body-parser');

// Ejecutar Express
var app = express();

// Cargar archivos de rutas

// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// CORS

// Reescribir Rutas

// Ruta/metodo de prueba
app.get('/prueba', (req, res) => {
	return res.status(200).send("<h1>Hola mundo, soy el back-end</h1>");
	// 	return res.status(200).send({
	// 	nombre:'Yolanda Cordero',
	// 	message:'Hola mundo desde el back-end con Node'
	// });
});

app.post('/prueba', (req, res) => {
		return res.status(200).send({
		nombre:'Yolanda Cordero',
		message:'Hola mundo desde el back-end con Node. Soy un método POST'
	});
});

//Exportar el módulo
module.exports = app;