const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const fs = require('fs');

const GOOGLE_CONFIG_PATH = 'content.json';

// Read and parse the Google OAuth2 credentials from the file
const googleConfig = JSON.parse(fs.readFileSync(GOOGLE_CONFIG_PATH, 'utf8'));

passport.use(new GoogleStrategy({
    clientID: googleConfig.web.client_id,
    clientSecret: googleConfig.web.client_secret,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('AccessToken:', accessToken);
    console.log('RefreshToken:', refreshToken);
    console.log('Profile:', profile);
    cb(null, profile);
  }
));


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
