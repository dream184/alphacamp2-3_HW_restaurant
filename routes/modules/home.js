const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/sort/:order', (req, res) => {
  const order = req.params.order
  const selectedOrder = function(order) {
    if (order === 'a-z') return { name_en: 'asc' }
    if (order === 'z-a') return { name_en: 'desc' }
    if (order === 'category') return { category: 'desc' }
    if (order === 'location') return { location: 'desc' }
  }
  Restaurant.find()
    .lean()
    .sort( selectedOrder(order) )
    .then(restaurants => res.render('index', { restaurantList: restaurants }))
    .catch(error => console.error('error'))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find({ name: { $regex: `${keyword}`, $options: 'i'} })
    .lean()
    .then(restaurants => res.render('index', { restaurantList: restaurants }))
    .catch(error => console.log('error'))
})

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurantList: restaurants }))
    .catch(error => console.error('error'))
})

module.exports = router