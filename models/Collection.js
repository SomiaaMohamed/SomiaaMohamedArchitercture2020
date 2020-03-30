var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for User
var Collection = new Schema({
  name: {
    type: String,
    required : true,
    
  },
  collectionImage : {
      type : String,
      required : false
  },
},
{
	collection: 'collection'
});

module.exports = mongoose.model('Collection', Collection);