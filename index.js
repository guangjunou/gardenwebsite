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
// const joi = require('joi');

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

app.use(bodyParser.json());

const ExpressError = require('./model/ExpressError');
const { storeReturnTo } = require('./model/middleware');

const getaquote = require('./model/get-a-quote');

app.get('/', (req, res) => {
    res.render('home', { lang: 'en' })
  });
  app.get('/chinese', (req, res) => {
    res.render('home', { lang: 'zh' })
  });

app.get('/about-us', (req, res) => {
    res.render('aboutus', { lang: 'en' })
  });

app.get('/contact-us', (req, res) => {
    res.render('contactus', { lang: 'en' })
  });

app.get('/get-a-quote', (req, res) => {
  console.log(req.acceptsLanguages('en-US'));
  //get the lang from the req
  //if lang === 'en' {
  // redirect 
    res.render('getaquote', { lang: 'en' })
  });
app.get('/get-a-quotechinese', (req, res) => {
    res.render('getaquote', { lang: 'zh' })
  });
app.post('/send-email', getaquote.createEmail);



app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404))
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if(!err.message) err.message = 'Oh No, Something Went Wrong!';
  res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log("Serving on port 3000")
  })