const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
const restaurantList = require('./restaurant.json')
  
app.use(express.static('public'))

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant =>
    restaurant.name.toLowerCase().includes(keyword.toLowerCase()) 
  )
  res.render('index', { restaurantList: restaurants, keyword })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurantId = req.params.id
  const restaurant = []
  const foundedRestaurant = restaurantList.results.find(restaurant => restaurant.id === Number(restaurantId))
  restaurant.push(foundedRestaurant)
  res.render('show', { restaurant })
})

app.get('/', (req, res) => {
  res.render('index', { restaurantList: restaurantList.results })
})

app.listen(port, (req, res) => {
  console.log(`Express is listening on http://localhost:${port}`)
})