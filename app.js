const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const session = require('express-session')
const usePassport = require('./config/passport')

const routes = require('./routes')
const port = 3000
require('./config/mongoose')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'codingfun',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

app.listen(port, (req, res) => {
  console.log(`Express is listening on http://localhost:${port}`)
})