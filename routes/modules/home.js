const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/sort/:order', (req, res) => {
  const order = req.params.order
  const userId = req.user._id
  const selectedOrder = {
    'a-z': { name_en: 'asc' },
    'z-a': { name_en: 'desc' },
    'category': { category: 'desc' },
    'location': { location: 'desc' }
  }

  Restaurant.find({ userId })
    .lean()
    .sort(selectedOrder[order])
    .then(restaurants => res.render('index', { restaurantList: restaurants }))
    .catch(error => console.error('error'))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const userId = req.user._id
  Restaurant.find({ userId, name: { $regex: `${keyword}`, $options: 'i' } })
    .lean()
    .then(restaurants => res.render('index', { restaurantList: restaurants }))
    .catch(error => console.log('error'))
})

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then((restaurants) => {
      res.render('index', { restaurantList: restaurants })
    })
    .catch(error => console.error('error'))
})

module.exports = router
