const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')
// use .ENV file for environment variables
require('dotenv').config({path: './config/.env'})
//new stuff
const { MongoClient } = require('mongodb');
const uri = process.env.DB_STRING;
const client = new MongoClient(uri);
//


// Passport config
require('./config/passport')(passport)
// Connect to MongoDB
connectDB()
// EJS in views folder
app.set('view engine', 'ejs')
// static folder
app.use(express.static('public'))
// body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// logging
app.use(logger('dev'))
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
// use flash messages for errors, etc
app.use(flash())
 // set up routes for which the server is listening 
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)

// OG code
// app.listen(process.env.PORT, ()=>{
//     console.log('Server is running on 2122, you better catch it!')
// })
//new stuff
const dbS = connectDB().then(() => {


  client.connect(async err => {
    //Connect To Database
    // connectDB();
    // if(!connect) {console.log('Mongoose ran away'); return false}
    if(err){ console.error(err); return false;}
    // connection to mongo is successful, listen for requests
    app.listen(process.env.PORT, () => {
      console.log("listening for requests");
    })
  });
  // connectDB(app)
  //
  
  })




