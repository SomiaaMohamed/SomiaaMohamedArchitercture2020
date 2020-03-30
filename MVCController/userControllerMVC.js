var express = require('express');
var app = express();
var users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var User = require('../models/user');
process.env.SECRET_KEY = 'secret';
let CurrentUser = new User() ;
let currentToken = '';
let message ='';

exports.userLogin = function(req,res){
    message= "",
    res.render('login.ejs',{message : message});;
}


exports.userHome =  function(req,res){
     res.render('home.ejs',{token:currentToken,first_name:CurrentUser.first_name,last_name:CurrentUser.last_name, email: CurrentUser.email});
    // res.render('home.ejs')
}
exports.userLoginSend = async function(req,res){
    await User.findOne(
        { email :req.body.email})
    .then(user => {
        
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                CurrentUser.email= user.email;
                CurrentUser.first_name = user.first_name;
                CurrentUser.last_name = user.last_name
                const payload = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn : 1440
                });
                currentToken = token;
                res.render('home.ejs',{token:token,first_name:user.first_name,last_name:user.last_name, email: user.email});
            }
            else{
                message =" user does not exist"
                res.render('login.ejs',{message : message});
            }
        }
        else{
            message =" user does not exist"
            res.render('login.ejs',{message : message});
        }
    })
    .catch(err => {
        res.status(400).json({error: err})
    })
}

exports.userRegisterSend = async function(req,res){
    const userData = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        password : req.body.password
    } 
    User.findOne({
            email : req.body.email,
    }).then(user => {
        if(!user){
            bcrypt.hash(req.body.password, 10,(err,hash) => {
                userData.password = hash
                User.create(userData)
                .then(user => {
                    message="Registred",
                    res.render('login.ejs',{message : message});;
                })
                .catch(err => {
                    res.send('error' + err)
                })
            })
        }else{
            message= "user already exist, try to login"
            res.render('login.ejs',{message : message});;
        }
    }).catch(err => {
        res.send('error ' + err)
    })
}
