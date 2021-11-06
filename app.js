const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const port = 3000
const routes = require('./routes')

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
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

app.listen(port, (req, res) => {
  console.log(`Express is listening on http://localhost:${port}`)
})