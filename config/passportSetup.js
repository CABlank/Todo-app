const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const fs = require('fs');
const db = require('../database'); // Import the database configuration

const GOOGLE_CONFIG_PATH = 'content.json';
const googleConfig = JSON.parse(fs.readFileSync(GOOGLE_CONFIG_PATH, 'utf8'));

passport.use(new GoogleStrategy({
    clientID: googleConfig.web.client_id,
    clientSecret: googleConfig.web.client_secret,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    const { id, emails, name, photos } = profile;
    const email = emails[0].value;
    const photoURL = photos[0].value;

    // Check if user exists, if not, create the user
    db.run(`INSERT INTO Users (GoogleUserID, Email, Name, ProfilePictureURL) VALUES (?, ?, ?, ?)
            ON CONFLICT(GoogleUserID) DO UPDATE SET Email=excluded.Email, Name=excluded.Name, ProfilePictureURL=excluded.ProfilePictureURL`,
      [id, email, `${name.givenName} ${name.familyName}`, photoURL],
      (err) => {
        if (err) {
          console.error('Error saving user to database', err);
          return cb(err);
        }
        return cb(null, profile);
      });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id); // Use GoogleUserID for session
});

passport.deserializeUser((id, done) => {
  db.get(`SELECT * FROM Users WHERE GoogleUserID = ?`, [id], (err, user) => {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});
