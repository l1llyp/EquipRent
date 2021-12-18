const path = require('path');
const passport = require('passport');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
const app = express();
const { db, User, ItemImg, Reservation, Post, Item } = require('../db/index.js');
const authRouter = require('./routes/auth-router.js');
require('../config/passport-setup.js');
require('dotenv').config();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const postRoute = require('./routes/post-router.js');
const itemRoute = require('./routes/item-router.js');

app.use(bodyParser.json());
app.use(express.static(CLIENT_PATH));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: true
}));

//routes
app.use(authRouter);
// app.use('/auth', authRouter);
app.use('/post', postRoute);
app.use('/item', itemRoute);
app.get('/auth', (req, res) => console.log('body:', req.body));
app.get('/logout', (req, res) => console.log('You Have Been Logged Out'));


module.exports = {
  app,
};