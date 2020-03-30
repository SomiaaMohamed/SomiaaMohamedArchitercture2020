var express = require('express');
var app = express();
var users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var User = require('../models/user');
process.env.SECRET_KEY = 'secret'
exports.userRegister = function(req,res)  {
    const userData = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        password : req.body.password
    } 
    User.findOne({
            email : req.body.email,
    })
    .then(user => {
        if(!user){
            bcrypt.hash(req.body.password, 10,(err,hash) => {
                userData.password = hash
                User.create(userData)
                .then(user => {
                    res.json( {registred : user.email + ' registred'})
                })
                .catch(err => {
                    res.send('error' + err)
                })
            })
        }else{
            res.json( "User already exists")
        }
    })
    .catch(err => {
        res.send('error ' + err)
    })
}

exports.userLogin = async function(req,res){
    User.findOne(
        { email :req.body.email})
    .then(user => {
        
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                const payload = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn : 1440
                })
                res.send({ token : token})
            }
            else{
                res.send({error : "User does not exist"})
            }
        }
        else{
            res.send("User does not exist")
        }
    })
    .catch(err => {
        res.status(400).json({error: err})
    })
}

