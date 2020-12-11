const express = require('express');
const router = express.Router();



const controladorMarcas = require('../controllers/marcasController')
router.get('/',controladorMarcas.marcas);
router.get('/:marca',controladorMarcas.marca);





module.exports = router;