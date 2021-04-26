var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String,
  refreshTokens: {
    type: Array,
    "default": []
  },
  verivicationImage: {
    data: Buffer,
    contentType: String
  },
  location: {
    type: {
      type: String
    },
    coordinates: {
      index: { type: '2dsphere', sparse: false },
      type: Array,
      "default": []
    }
  }
});
mongoose.model('users', UserSchema);


module.exports = mongoose.model('users');