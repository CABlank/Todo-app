const express = require('express');
const session = require('express-session');
const app = express();
require('./passport-setup');
const passport = require('passport');

app.use(session({
    secret: 'thisIsASecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
  }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/', (req, res) => {
  res.send('Home Page. User: ' + req.user);
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
