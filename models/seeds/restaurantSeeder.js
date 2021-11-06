const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantSeeds = require('../../restaurant.json').results

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < restaurantSeeds.length; i++) {
    Restaurant.create(restaurantSeeds[i])
  }
  console.log('added restaurants to db')
})
