const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const URLSchema = new Schema({
  originalUrl: {type: String, required: true},
  shortUrl: {type: String, required: true},
  clicks:{type :Number,default : 0}
},{
    timestamps: true
});

const URL = mongoose.model('Url', URLSchema);

module.exports=URL;