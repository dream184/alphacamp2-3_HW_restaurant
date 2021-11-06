const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
  
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

const Restaurant = require('./models/restaurant')

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const restaurants = restaurantList.results.filter(restaurant =>
//     restaurant.name.toLowerCase().includes(keyword.toLowerCase()) 
//   )
//   res.render('index', { restaurantList: restaurants, keyword })
// })

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.get('/restaurants/:id/edit', (req, res) => {
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

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, description } = req.body
  console.log(id)
  console.log(name)
      
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

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants/', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, description }  = req.body
  Restaurant.create({ name, name_en, category, image, location, phone, google_map, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurantList: restaurants }))
    .catch(error => console.error('error'))
})

app.listen(port, (req, res) => {
  console.log(`Express is listening on http://localhost:${port}`)
})