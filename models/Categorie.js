var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const collection = require("../models/Collection")
// Define collection and schema for User
var Categorie = new Schema({
  name: {
    type: String,
    required : true,
    
  },
  collectionID: {
    type: ObjectId, ref: 'collection'
},
},
{
	categorie: 'categorie'
});

module.exports = mongoose.model('Categorie', Categorie);