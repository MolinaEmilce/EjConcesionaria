const express = require('express');
const router = express.Router();



const controladorMarcas = require('../controllers/marcasController')
router.get('/:marca',controladorMarcas.marca);
router.get('/marcas',controladorMarcas.marcas);





module.exports = router;