const express = require('express');
const route = express.Router();


const controllerHome = require('../controllers/homeController');

//route.get('/', controllerHome.welcome);
route.get('/', controllerHome.home);

module.exports=route;