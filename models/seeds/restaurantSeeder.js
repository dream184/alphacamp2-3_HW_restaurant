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
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    ownedRestaurant: [4, 5, 6]
  }
]

db.once('open', () => {
  console.log('mongodb connected!')
  Promise.all(SEED_USER.map(user => {
    return bcrypt.genSalt(10)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
      })
      .then(hash => {
        return User.create({
          name: user.name,
          email: user.email,
          password: hash
        })
      })
      .then(registeredUser => {
        const restaurantList = restaurants.filter(restaurant => user.ownedRestaurant.includes(restaurant.id))     
        return Promise.all(restaurantList.map(restaurant => 
          Restaurant.create({
            name: restaurant.name,
            name_en: restaurant.name_en,
            category: restaurant.category,
            image: restaurant.image,
            phone: restaurant.phone,
            google_map: restaurant.google_map,
            rating: restaurant.rating,
            description: restaurant.description,
            userId: registeredUser._id
          })
        ))
      }) 
  }))
    .then(() => {
      console.log('added restaurants to db')
      process.exit()
    })  
    .catch(err => console.log(err))
})

