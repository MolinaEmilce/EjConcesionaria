const express = require('express');
const router = express.Router();

const controladorAutos = require('../controllers/autosController');
router.get('/',controladorAutos.autos);
router.get('/:marca',controladorAutos.idMarca);
module.exports= router;