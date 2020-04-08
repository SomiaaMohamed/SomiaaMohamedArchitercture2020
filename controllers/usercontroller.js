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
                    res.status(200).json( {registred : user.email + ' registred'})
                    console.log(res)
                })
                .catch(err => {
                    res.status(400).send('error' + err)
                })
            })
        }else{
            res.status(400).json({ error : "User already exists" })
            console.log(res)
        }
    })
    .catch(err => {
        res.status(400).send('error ' + err)
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
                    expiresIn : 5440
                })
                res.status(200).send({ token : token})
            }
            else{
                res.status(400).send({error : "User does not exist"})
            }
        }
        else{
            res.status(400).send("User does not exist")
        }
    })
    .catch(err => {
        res.status(400).json({error: err})
    })
}


// [
//     {
//         "_id": "5e85d51310ad393230f0213a",
//         "name": "Collection 2 ",
//         "collectionImage": "uploads\\1585829139627-C1P3-schema-05-v11.png",
//         "__v": 0
//     },
//     {
//         "_id": "5e85d52310ad393230f0213b",
//         "name": "Collection 1",
//         "collectionImage": "uploads\\1585829155265-croisement-indonesienne.png",
//         "__v": 0
//     }
// ]