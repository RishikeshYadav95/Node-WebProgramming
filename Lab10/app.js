const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');
const bodyParser = require("body-parser");
app.use(express.json());
const exphbs = require("express-handlebars");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(
    session({
      name: 'AuthCookie',
      secret: "Secret!",
      resave: false,
      saveUninitialized: true
    })
);

app.use('/private', (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/');
  } else {
    next();
  }
});

app.use('/login', (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/private');
  } else {
    req.method = 'POST';
    next();
  }
});

app.use('/signup', (req, res, next) => {
    if (req.session.user) {
      return res.redirect('/private');
    } else {
      next();
    }
  });

  app.use(async (req, res, next) => {
    let date = new Date().toUTCString();
    let method = req.method;
    let url = req.originalUrl;
    let authentication = "";
    if (req.session.user) {
      authentication = 'Authenticated User';
    } else {
      authentication = 'Non-Authenticated User';
    }
    console.log("["+date+"]: " + method + " " + url + " " + authentication)
    next();
  });

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});