var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const categorie = require("../models/Categorie")
// Define collection and schema for User
var Ouvrage = new Schema({
  titre: {
    type: String,
    required : true,
    
  },
  categorieID: {
    type: ObjectId, ref: 'categorie'
},
auteur: {
    type: String,
    required : true,
    
  },
  prix: {
    type: Number,
    required : false,
  },
},
{
	ouvrage: 'ouvrage'
});

module.exports = mongoose.model('Ouvrage', Ouvrage); 