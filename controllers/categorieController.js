var express = require('express');
var Categorie = require("../models/Categorie");

exports.categorieCreate = async function(req,res) {
    const catData = {
        name : req.body.name,
        collectionID : req.body.collectionID
    }
    await Categorie.create(catData)
    .then(cat => {
res.json({succes : true})
    })
    .catch(err => {
        res.send('error : ' + err)
    })
}

exports.categorieGetAll = function(req,res) {
    Categorie.find(function(err,cat) {
        if(err){
            console.log(err);
        }
        else{
            res.json(cat)
        }
    })}
exports.categoieDel = function(req,res){
    Categorie.findByIdAndRemove({_id: req.params.idCat}, function(err, item){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
}

    exports.catgoriesFilterByname = function(req,res) {
        Categorie.find({name : req.params.name})
        .then(cat =>{
            res.json(cat)
        })
        .catch(err => {
            res.send("error : "+ err)
        })
    }
exports.categorieByCol = function(req,res) {
    Categorie.find({ collectionID : req.params.idCol})
    .then( cat => {
        res.json(cat)
    })
    .catch(err => {
        res.send("error : " + err)
    })
}

exports.categorieUpdate = async function(req,res){
    await Categorie.findByIdAndUpdate({_id:req.params.idCat},{name:req.body.name})
    .then(cat =>{
        res.json(cat)
    })
    .catch(err =>{
        res.send("error : "+ err)
    })
}