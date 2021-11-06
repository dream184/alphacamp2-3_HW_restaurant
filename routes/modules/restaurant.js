const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js')

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', {
      restaurant: restaurant,
      category: restaurant.category,
      helpers: {
        isValueSelected: function (selectedValue, value) {
          return selectedValue === value;
        }
      }
    }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, description } = req.body
  
  Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.warn(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, description }  = req.body
  Restaurant.create({ name, name_en, category, image, location, phone, google_map, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router