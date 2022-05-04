
const express = require('express');
require('dotenv').config();
const { dbConection } = require('./database/config')
const cors = require('cors');


// Crear el servidor de Express

const app = express();

// Base de datos
dbConection();

// CORS 
app.use(cors());

// Directorio Público
app.use( express.static('public') );

// Lectura y parse del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))


// Escuchar las peticiones
app.listen( 4000, () => {
    console.log(`Servidor corriendo en puerto ${ 4000 }`);
} )

