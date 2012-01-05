var util = require('util')
  , express = require('express')
  , pg = require('pg').native
  , form = require('connect-form')
  , _ = require('underscore')

// Express.js setup
var app = express.createServer()

app.set('view engine', 'ejs')
app.use(express.cookieParser())
app.use(form({ keepExtensions: true }))
app.use(express.static(__dirname + '/public'))
app.use('/styles', express.static(__dirname + '/frontend/styles'))
app.use('/images', express.static(__dirname + '/frontend/images'))
app.use(express.logger('tiny'))
app.use(express.bodyParser())

app.configure(function() {
    app.set('views', __dirname)
})

// Database connection
var conString = process.env["SHARED_DATABASE_URL"]
if (!conString)
  conString = "tcp://postgres:postgres@localhost/v6z"
console.log("Connecting to database " + conString)
var pgClient = new pg.Client(conString)
pgClient.connect()
pgClient.on('error', function(err, pgClient) {
  console.log("Connection error! " + util.inspect(err))
})

// Serve up frontend files
var backboneApp = require('./backboneApp')({
  app: app
})

// Start up web server
var port = process.env.PORT || 3135
app.listen(port)

console.log("Server started, try to connect at http://127.0.0.1:" + port + "/")


