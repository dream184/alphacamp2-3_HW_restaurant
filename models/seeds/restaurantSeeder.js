const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantSeeds = require('../../restaurant.json').results
mongoose.connect('mongodb://localhost/restaurant-list')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < restaurantSeeds.length; i++) {
    Restaurant.create(restaurantSeeds[i])
  }
  console.log('added restaurants to db')
})
