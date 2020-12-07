const express = require('express');
const app = express();

app.listen(3030,()=>console.log('Servidor corriendo :)'));


const rutaHome = require('./routes/home');
app.use('/', rutaHome);

const rutaSucursales = require('./routes/sucursales');
app.use('/sucursales',rutaSucursales);