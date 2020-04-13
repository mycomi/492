const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  _uid: {
    type: mongoose.ObjectId,
    required: true
  },
  Aname: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  info: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  updated: {
    type: Date,
    required: true,
    default: Date.now
  }
})

//.model(export-name, schema, collection-name)
module.exports = mongoose.model('Item', itemSchema)