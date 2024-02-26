const express = require('express');
const session = require('express-session');
const app = express();
require('./config/passportSetup');
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
  passport.authenticate('google', { scope: ['profile', 'email'] }
));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});


app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
res.render('index', { user: req.user });
});

app.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    // Destroy session data
    req.session.destroy(() => {
      // Redirect to home page after logout
      res.redirect('/');
    });
  });
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
