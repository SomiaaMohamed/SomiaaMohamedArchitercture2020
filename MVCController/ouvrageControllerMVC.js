var Ouvrage = require("../models/Ouvrage");
let listOuvrage = [];
let currentCat = '';
let ouvToUpdate = '';

exports.ouvrageRedirect = async function(req,res){
    currentCat = req.params.idCat;
    await  Ouvrage.find({categorieID: req.params.idCat})
    .then(ouv => {
        listOuvrage = ouv
        res.render('ouvrage.ejs',{ouvrageList : listOuvrage})
    })
    .catch(err => {
        res.send("error : "+ err)
    })
}

exports.createRedirect = function(req,res){
    res.render('createOuvrage.ejs',{update: false})
}

exports.createOuvrage = async function(req,res){
    const ouvData = {
        titre : req.body.titre,
        categorieID : currentCat,
        auteur : req.body.auteur,
        prix : req.body.prix, 
    }

        await Ouvrage.create(ouvData, function(err, item){
        if(err) res.json(err);
        else{
            listOuvrage.pop(res);
            res.redirect('/ouvrages/MVC/ouvrage/'+ currentCat) ;

        } 
    });
}

exports.ouvrageDelete = async function(req,res){
    let deleted = listOuvrage.splice(req.params.idOuv,1)
    await Ouvrage.findByIdAndRemove({_id: deleted[0]._id}, function(err, item){
        if(err) res.json(err);
        else  res.redirect('/ouvrages/MVC/ouvrage/'+ currentCat) ;
    });
}

exports.ouvrageUpdateRedirect = async function(req,res,next){
    await Ouvrage.findById({_id: req.params.idOuv},function(err,col) {
        if(err){
            console.log(err);
        }
        else{
            ouvToUpdate = col;
        }
    })
    res.render('createOuvrage.ejs',{update:true,ouv : ouvToUpdate})
}

exports.ouvrageUpdate = async function(req,res){
    await Ouvrage.findByIdAndUpdate({_id:ouvToUpdate._id},{titre:req.body.titre,auteur : req.body.auteur,prix : req.body.prix, },function(err,col){
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/ouvrages/MVC/ouvrage/'+ currentCat) ;
        }
    })
}