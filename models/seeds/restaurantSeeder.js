const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurants = require('../../restaurant.json').results

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    ownedRestaurant: [1, 2, 3]
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    ownedRestaurant: [4, 5, 6]
  }
]

db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 0; i < SEED_USER.length; i++) {
    bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
      .then(hash => User.create({
        name: SEED_USER[i].name,
        email: SEED_USER[i].email,
        password: hash
      }))
      .then(user => {
        const restaurantList = restaurants.filter(restaurant => SEED_USER[i].ownedRestaurant.includes(restaurant.id))

        for (let i = 0; i < 3; i++) {
          Restaurant.create({
            name: restaurantList[i].name,
            name_en: restaurantList[i].name_en,
            category: restaurantList[i].category,
            image: restaurantList[i].image,
            phone: restaurantList[i].phone,
            google_map: restaurantList[i].google_map,
            rating: restaurantList[i].rating,
            description: restaurantList[i].description,
            userId: user._id
          })
        }
      })
      .catch(err => console.log(err))
  }
  console.log('added restaurants to db')
  process.exit()
})
