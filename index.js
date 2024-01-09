// if(process.env.NODE_ENV !== "production") {
//     require('dotenv').config();
//   }

  
const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
const flash = require('connect-flash');
const session = require('express-session');
const joi = require('joi');

const app = express();


app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const sessionConfig = {
    secret: 'thisshouldbebettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
    }//to auto log out after a week after user login
  }
app.use(session(sessionConfig));

app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error')
    next();
})

const getaquote = require('../garden/model/get-a-quote');

app.get('/', (req, res) => {
    res.render('home')
  });

app.get('/about-us', (req, res) => {
    res.render('aboutus')
  });

app.get('/contact-us', (req, res) => {
    res.render('contactus')
  });

app.get('/get-a-quote', (req, res) => {
    res.render('getaquote')
  });
app.post('/send-email', getaquote.createEmail);

app.use((err, req, res, next) => {
    res.send('Something went wrong!')
})

app.listen(3000, () => {
    console.log("Serving on port 3000")
  })