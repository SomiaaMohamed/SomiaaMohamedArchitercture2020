var express = require('express');
var Collection = require('../models/Collection');
let collectionList = [];
let colToUpdate = '';

exports.collectionList =  async  function(req,res,next){
    await Collection.find(function(err,col) {
        if(err){
            console.log(err);
        }
        else{
            collectionList = col;
        }
    })

    res.render('collection.ejs',{collections:collectionList});
}

exports.collectionDelete =  async function(req,res){
    let deleted = collectionList.splice(req.params.idCol,1);
    await Collection.findByIdAndRemove({_id: deleted[0]._id}, function(err, item){
        if(err) res.json(err);
        else res.redirect('/collections/MVC/collection') ;
    });
}
 
exports.collectionNewRedirect = function(req,res){
    res.render('CreateCollection.ejs',{update:false})
}

exports.collectionCreate =  async function (req,res) {
    const collectionData = {
        name: req.body.name,
        collectionImage: req.file.path,
    }
    await Collection.create(collectionData, function(err, item){
        if(err) res.json(err);
        else{
            collectionList.pop(res);
            res.redirect('/collections/MVC/collection') ;

        } 
    });
} 
exports.collectionUpdateRedirect =  async  function(req,res,next){
    await Collection.findById({_id: req.params.idCol},function(err,col) {
        if(err){
            console.log(err);
        }
        else{
            colToUpdate = col;
        }
    })
    res.render('CreateCollection.ejs',{update:true,Col: colToUpdate})
}

exports.collectionUpdate = async function(req,res){
    if(req.file){
        await Collection.findByIdAndUpdate({_id:colToUpdate._id},{name:req.body.nameU,collectionImage: req.file.path, },function(err,col){
            if(err){
                console.log(err)
            }
            else{
                res.redirect('/collections/MVC/collection') ;
            }
        })
        
    }
    else {
        await Collection.findByIdAndUpdate({_id:colToUpdate._id},{name:req.body.nameU},function(err,col){
            if(err){
                console.log(err)
            }
            else{
                res.redirect('/collections/MVC/collection') ;
            }
        })
    }
    
}