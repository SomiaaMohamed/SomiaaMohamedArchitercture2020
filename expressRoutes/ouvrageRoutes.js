var express = require('express');
var ouvrages = express.Router();
var ouvrageController = require("../controllers/ouvrageController")
var ouvrageControllerMVC = require("../MVCController/ouvrageControllerMVC")

ouvrages.post('/create', ouvrageController.ouvrageCreate)
ouvrages.get('/getOne/:idCat', ouvrageController.ouvrageGetByCat)
ouvrages.get('/MVC/ouvrage/:idCat', ouvrageControllerMVC.ouvrageRedirect)
ouvrages.get('/MVC/create',ouvrageControllerMVC.createRedirect)
ouvrages.post('/MVC/create', ouvrageControllerMVC.createOuvrage)
ouvrages.get('/MVC/delete/:idOuv',ouvrageControllerMVC.ouvrageDelete)
ouvrages.get('/MVC/update/:idOuv', ouvrageControllerMVC.ouvrageUpdateRedirect)
ouvrages.post('/MVC/update',ouvrageControllerMVC.ouvrageUpdate)
ouvrages.delete('/delete/:idOuv',ouvrageController.ouvrageDel)
ouvrages.post('/update/:idOuv',ouvrageController.ouvrageUpdate)
 
module.exports = ouvrages;