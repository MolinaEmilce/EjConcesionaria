const express = require('express');
const router = express.Router();

const controllerSucursales = require('../controllers/sucursalesController');
router.get('/',controllerSucursales.home);
router.get('/:sucursal',controllerSucursales.sucursal);






module.exports=router;