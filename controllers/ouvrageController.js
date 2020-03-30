var express = require('express');
var Ouvrage = require("../models/Ouvrage")

exports.ouvrageCreate = async function(req,res) {
    const ouvData = {
        titre : req.body.titre,
        categorieID : req.body.categorieID,
        auteur : req.body.auteur,
        prix : req.body.prix
    }
    await Ouvrage.create(ouvData)
    .then(ouv => {
        res.json({succes : true})
    })
    .catch(err => {
        res.send('error : ' + err)
    })
}

exports.ouvrageGetByCat = async function(req,res) {
   await  Ouvrage.find({categorieID: req.params.idCat})
    .then( ouv => {
        res.json(ouv)
    })
    .catch(err =>{
        res.send('error : '+ err)
    })
}

exports.ouvrageDel = function(req,res){
    Ouvrage.findByIdAndRemove({_id: req.params.idOuv}, function(err, item){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
}
exports.ouvrageUpdate = async function(req,res){
    await Ouvrage.findByIdAndUpdate({_id:req.params.idOuv},{titre:req.body.titre,auteur:req.body.auteur,prix:req.body.prix})
    .then(ouv =>{
        res.json(ouv)
    })
    .catch(err =>{
        res.send("error : "+ err)
    })
}