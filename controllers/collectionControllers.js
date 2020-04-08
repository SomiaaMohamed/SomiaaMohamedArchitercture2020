var express = require('express');
var app = express();
var collections = express.Router();
const cors = require('cors');
const multer = require('multer');
var Collection = require('../models/Collection');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    }, 
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }

}


const upload = multer({
    storage: storage
});

exports.collectionGetAll = function(req,res) {
    Collection.find(function(err,col) {
        if(err){
            res.status(400).send(err)
        }
        else{
            res.status(200).json(col)
        }
    })
}
exports.collectionCreate = function(req,res){
    const collectionData = {
        name: req.body.name,
        collectionImage: req.file.path,
    }
    Collection.create(collectionData)
        .then(coll => {
            res.status(200).json({ succes: true })
        })
        .catch(err => {
            res.status(400).send({ error: err.message, succes: false })
        })
}

exports.collectionUpdate = function(req,res){
    if(req.file && req.body.name){
        Collection.findByIdAndUpdate({_id:req.params.idCol},{name:req.body.name,collectionImage: req.file.path})
        .then(col =>{
            res.status(200).json({ succes :true ,collection:col})
        })
        .catch(err =>{
            res.status(400).send({ error: err.message, succes: false })
        })
    }
    else if(req.body.name){
        Collection.findByIdAndUpdate({_id:req.params.idCol},{name:req.body.name})
        .then(col =>{
            res.status(200).json({ succes :true ,collection:col})
        })
        .catch(err =>{
            res.status(400).send({ error: err.message, succes: false })
        })
    }
    else{
        res.status(400).send({succes:false,error: "path name is required"})
    }
}

exports.collectionDelOne = function(req,res){
    console.log(req.params.id)
        Collection.findByIdAndRemove({_id: req.params.id}, function(err, item){
              if(err) res.status(400).send({ error: err.message, succes: false })
              else res.status(200).json({succes:true, message: 'Successfully removed'});
          });
      };

 
    // itemRoutes.route('/delete/:id').get(function (req, res) {
    //     Item.findByIdAndRemove({_id: req.params.id}, function(err, item){
    //           if(err) res.json(err);
    //           else res.json('Successfully removed');
    //       });
    //   });



// exports.collectionDeleteAll = function(req,res) {
//     Collection.deleteMany(function(err, res){
//     if(err){
//         console.log(err);
//     }
//     else{
//         res.json(res)
//     }
// }


//     )}
// exports.collectionAdd = function(req,res) {
    
//     console.log(req.body.collectionImage)
// // const collectionData = {
// //     name : req.body.name,

// // }
// //    Collection.create(collectionData)
// //    .then(coll => {
// //     res.json({status : coll.name + ' added'})
// // })
// // .catch(err => {
// //     res.send('error' + err)
// // })
// }


// {
//     "err": "Collection validation failed: name: Path `name` is required."
// }

