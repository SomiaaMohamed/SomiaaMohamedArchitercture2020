var express = require('express');
var collections = express.Router();
var Collection = require('../models/Collection');
var collectionController = require('../controllers/collectionControllers');
var collectionControllerMVC = require('../MVCController/collectionControllerMVC')
const multer = require('multer');
process.env.SECRET_KEY = 'secret';
const checkAuth = require('../middelware/check-auth')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const upload = multer({
    storage: storage
});

collections.post('/update/:idCol', checkAuth,upload.single('collectionImage') ,collectionController.collectionUpdate)
collections.get("/getAll" , checkAuth, collectionController.collectionGetAll );
collections.delete("/delete/:id", checkAuth, collectionController.collectionDelOne);
collections.post('/add', checkAuth ,upload.single('collectionImage'),collectionController.collectionCreate);
collections.post('/MVC/collection/create',upload.single('CollectionFile'), collectionControllerMVC.collectionCreate);
collections.get('/MVC/collection/new',collectionControllerMVC.collectionNewRedirect)
collections.get('/MVC/collection',collectionControllerMVC.collectionList);
collections.get('/MVC/collection/delete/:idCol',collectionControllerMVC.collectionDelete);
collections.get('/MVC/collection/update/:idCol',collectionControllerMVC.collectionUpdateRedirect)
collections.post('/MVC/collection/update',upload.single('CollectionFile'),collectionControllerMVC.collectionUpdate)

module.exports = collections;
