const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const swig = require('swig');
const SpotifyStrategy = require('passport-spotify').Strategy;
const path = require('path');
const consolidate = require('consolidate');
const User = require('./models/User.js');
const envKeys = require('../client/env/config.js')

//  Use let to allow the port variable to be changed when hoisted.
let port = process.env.PORT || 8080;

/************************ Api Keys ********************************/

const spotifyKey = process.env.SPOTIFYKEY || envKeys.spotifyKey;
const spotifySecret = process.env.SPOTIFYSECRET || envKeys.spotifySecret;
const youtubeKey = process.env.YOUTUBEKEY || envKeys.youtubeKey;
/******************************************************************/

/************************ Set up Passport *************************/

//  To support persistent login sessions, Passport needs to be able to
//  serialize users into and deserialize users out of the session. Since
//  this application does not have a database the complete spotify profile is serialized
//  and deserialized.
passport.serializeUser(function(user, done) {
  // Pass on the user.
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  // Pass on the user.
  done(null, obj);
});

//  Use the SpotifyStrategy within Passport.
//  Strategies in Passport require a `verify` function, which accept
//  credentials (in this case, an accessToken, refreshToken, and spotify
//  profile), and invoke a callback with a user object.
passport.use(new SpotifyStrategy({
  clientID: spotifyKey,
  clientSecret: spotifySecret,
  callbackURL: 'http://localhost:8080/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    //  Asynchronous verification.
    process.nextTick(function () {
      // Add token to profile to access in requests to spotify.
       profile.token = accessToken
      // Return a users profile to varify that they are logged in.
      return done(null, profile);
    });
  }));
/******************************************************************/


/************************ Set up Express **************************/

const app = express();
//  Set up consolidate so express can use the swig engine to render html.
app.engine('html', consolidate.swig);
//  Set views to the views folder. 
app.set('views', path.resolve(__dirname + '/../client/public/views'));
//  Set the view engine to ejs. The view engine is set to jade by default.
app.set('view engine', 'ejs');
/******************************************************************/


/************************ Set up middleware ***********************/

//  Parse all incoming cookies.
app.use(cookieParser());
//  Parse all incomming JSON.
app.use(bodyParser.json());
//  Express session.
app.use(session({ secret: 'Mood Setter', resave: true,
    saveUninitialized: true }));
//  Initialize Passport.
app.use(passport.initialize());
//  Use passsport session middleware to allow for persistant login.
app.use(passport.session());
/******************************************************************/


/************************ Set up routes ***************************/

//  Use passport.authenticate() as route middleware to authenticate the
//  request. The first step in spotify authentication will involve redirecting
//  the user to spotify.com. After authorization, spotify will redirect the user
//  back to this application at /callback
app.get('/auth/spotify',
  // Set the scope so a user will see the spotify login dialog.
  passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'], showDialog: true}),
  function(req, res){
//  The request will be redirected to spotify for authentication, so this
//  function will not be called.
});

//  If authentication fails, the user will be redirected back to the
//  login page. Otherwise, the primary route function function will be called,
//  which, in this example, will redirect the user to the home page.
app.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/home');
  });
// Main endpoint.
app.get('/', function(req, res) {
    res.render('landing');
});
// On successful login.
app.get('/home', function(req, res) {
  // Only send the photo and name to the client side.
  let userInfo = User.welcomeUser(req.user)
    // If there is a user, render the home view, otherwise render the landing view.
   Object.keys(userInfo).length > 0 ? res.render('home', { user: userInfo }) : res.render('landing');

});

// Send main.js file when requested on with index.html render.
app.get('/main.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/public/main.js'))
})

// Send main.css file when requested with index.html render.
app.get('/main.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/public/main.css'))
})

// Send image for landing page.
app.get('/spotifyLanding', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/public/Spotify_Icon_RGB_Green.png'))
})

// Send the movie for the landing page.
app.get('/movie', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/public/landingVideo.mov'))
})

// Send image for main page.
app.get('/spotify', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/public/spotify.jpg'))
})

// Logout a user.
app.get('/logout', function(req, res) {
  // Destroy a users session and redirect to the homepage.
  req.logout();
  res.redirect('/');
});

// Grab a users playlists.
app.get('/getUserPlaylists', function (req, res) {
  User.grabId(req.user).then(function(info){
  request({
    url: `https://api.spotify.com/v1/users/${info.id}/playlists`, 
    method: 'GET', 
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${info.token}`
    }}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        res.send(body)
    }
  });
 })
})

// Search spotify for playlists
app.post('/search', function(req, res) {
  let URL = `https://api.spotify.com/v1/search?q=${req.body.searchTerm}&type=playlist`
  request(URL, function(error, response, body) {
      if (!error && response.statusCode == 200) {

         let parsedBody = JSON.parse(body);
         res.send(body)
      } else {
         console.log("/location error: ", error)
      }
   })
}); 

// search youtube
app.post('/search/youtube', function(req, res) {
  let URL = `https://www.googleapis.com/youtube/v3/search?&q=${req.body.searchTerm}&type=video&key=${youtubeKey}&part=snippet`
  request(URL, function(error, response, body) {
      if (!error && response.statusCode == 200) {

         let parsedBody = JSON.parse(body);
         res.send(body)
      } else {
         console.log("/location error: ", error)
      }
   })
}); 
/******************************************************************/


app.listen(port);

console.log('listening at http://localhost8080');

