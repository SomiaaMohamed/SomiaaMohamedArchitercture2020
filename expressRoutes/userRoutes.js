var express = require('express');
var users = express.Router();
var userController = require('../controllers/usercontroller');
var userControllerMVC = require('../MVCController/userControllerMVC')
process.env.SECRET_KEY = 'secret';

users.post("/register", userController.userRegister)
users.post("/login", userController.userLogin)
users.get("/MVC/login", userControllerMVC.userLogin)
users.get("/MVC/register", userControllerMVC.userRegister)
users.post("/MVC/loggedIn", userControllerMVC.userLoginSend)
users.post("/MVC/register/send", userControllerMVC.userRegisterSend)
users.get("/MVC/home",userControllerMVC.userHome)
module.exports = users;
