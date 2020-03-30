var Categorie = require("../models/Categorie");
let currentCollection = '';
let listCategorie = [];
let catToUpdate = '';
let filtredList = [];
let messageEmpty='We dont have item yet';

exports.categoriesRedirect = async function (req,res){
    currentCollection = req.params.idCol;
   await  Categorie.find({collectionID : req.params.idCol})
    .then( cat  => {
        listCategorie = cat
        res.render('categories.ejs', {categorieList: listCategorie,message: "We dont have item yet"})
    })
    .catch(err =>{
        res.send("error : " + err)
    })
}

exports.categoriesFilter = function(req,res){
    filtredList =  listCategorie.filter(list => list.name.includes(req.body.name));
    res.render('categories.ejs', {categorieList: filtredList,message: 'No Item Found'})
}

exports.categorieCreateRedirect = function(req,res){
    res.render('createCategorie.ejs',{update: false})
}

exports.categorieCreate = async function(req,res){
    const catData = {
        name : req.body.name,
        collectionID : currentCollection
    }
    await Categorie.create(catData, function(err, item){
        if(err) res.json(err);
        else{
            listCategorie.pop(res);
            res.redirect('/categories/MVC/categorie/'+ currentCollection) ;

        } 
    });
}

exports.categorieDelte = async function(req,res){
    let deleted = listCategorie.splice(req.params.idCat,1)
    await Categorie.findByIdAndRemove({_id: deleted[0]._id}, function(err, item){
        if(err) res.json(err);
        else res.redirect('/categories/MVC/categorie/'+ currentCollection) ;
    });

}

exports.categorieUpdateRedirect = async function(req,res,next){
    await Categorie.findById({_id: req.params.idCat},function(err,col) {
        if(err){
            console.log(err);
        }
        else{
            catToUpdate = col;
        }
    })
    res.render('createCategorie.ejs',{update:true,cat : catToUpdate,message: messageEmpty})
}

exports.categorieUpdate = async function(req,res){
    await Categorie.findByIdAndUpdate({_id:catToUpdate._id},{name:req.body.nameU},function(err,col){
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/categories/MVC/categorie/'+ currentCollection) ;
        }
    })
}