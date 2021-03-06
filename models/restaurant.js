const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  name_en: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: false
  },

  location: {
    type: String,
    required: false
  },

  phone: {
    type: String,
    required: false
  },

  google_map: {
    type: String,
    required: false
  },

  rating: {
    type: Number,
    required: false
  },

  description: {
    type: String,
    required: false
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    require: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
