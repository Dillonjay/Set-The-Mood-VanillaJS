const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const partials = require('express-partials');
const User = require('./models/User.js');

const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
// Middleware
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Client id and secret for authorizing users spotify account.
const spotifyClientId = 'b40cea95ad7143298ef925b6b2c80ab6'
const spotifyClientSecret = '5e044bf177914eb3b2b04fc437c4d6d2'


// Middleware for parsing any incoming json.
app.use(bodyParser.json());
// Middleware for parsing any incoming cookies.
app.use(cookieParser());
app.use(session({ secret: 'yolo' }))

app.set('views', path.resolve(__dirname + '/../client/public/views'));
app.set('view engine', 'ejs');
app.use(partials());


//////////// Passport spotify;
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {

  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});




passport.use(new SpotifyStrategy({
    clientID: spotifyClientId,
    clientSecret: spotifyClientSecret,
    callbackURL: "http://localhost:8080/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   var userInfo = User.welcomeUser(profile)
    
    return done(null, userInfo);
  }
));

app.get('/auth/spotify',
  passport.authenticate('spotify'),
  function(req, res){
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  });

app.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  function(req, res) {
    console.log('req', req.session)

    // Successful authentication, redirect home.
    res.render('index', {user: req.user})
  });


// For initial get request to the website, send back the main pages html.
app.get('/', function(req, res) {

  res.render('index' , {user:undefined})
  // Create absolute path from current file to the index.html file.
  // res.status(200).sendFile(path.resolve(__dirname + '/../client/public/index.html'));
});

// When the brower reads the script tag in html file, it will request for the main.js file.
app.get('/main.js', function(req, res) {
  // Create absolute path from current file to the main.js file
  res.status(200).sendFile(path.resolve(__dirname + '/../client/public/main.js'));
});
app.get('/login', function(req, res) {

})
app.get('/logout', function(req, res) {
  req.logout();
  res.render('index', {user: undefined})
})


// Have the server listen on local host 8080.
app.listen(8080);

console.log('listening at http://localhost8080')


