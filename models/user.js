var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for User
var User = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }, 
},
{
	collection: 'user'
});

module.exports = mongoose.model('User', User);