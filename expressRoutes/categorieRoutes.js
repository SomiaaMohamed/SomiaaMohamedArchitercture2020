var express = require('express');
var categories = express.Router();
var categorieController = require("../controllers/categorieController")
var categoriesControllerMVC = require("../MVCController/categoriesControllerMVC")
// var userController = require('../controllers/usercontroller');
// var userControllerMVC = require('../MVCController/userControllerMVC')

categories.get('/catFilterByName/:name', categorieController.catgoriesFilterByname)
categories.delete('/delete/:idCat', categorieController.categoieDel);
categories.post('/update/:idCat', categorieController.categorieUpdate)
categories.get('/MVC/categorie/:idCol', categoriesControllerMVC.categoriesRedirect);
categories.post('/create', categorieController.categorieCreate)
categories.get('/getAll', categorieController.categorieGetAll)
categories.get('/getOne/:idCol', categorieController.categorieByCol)
categories.get('/MVC/new', categoriesControllerMVC.categorieCreateRedirect)
categories.post('/MVC/create', categoriesControllerMVC.categorieCreate)
categories.get('/MVC/delete/:idCat', categoriesControllerMVC.categorieDelte)
categories.get('/MVC/update/:idCat', categoriesControllerMVC.categorieUpdateRedirect)
categories.post('/MVC/filter', categoriesControllerMVC.categoriesFilter)
categories.post('/MVC/update/', categoriesControllerMVC.categorieUpdate)
module.exports = categories;
