const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const swig = require('swig');
const SpotifyStrategy = require('passport-spotify').Strategy;
const path = require('path');
const consolidate = require('consolidate');
const User = require('./models/User.js')

//  Use let to allow the port variable to be changed when hoisted.
let port = process.env.PORT || 8080;

/************************ Api Keys ********************************/

const spotifyKey = 'b40cea95ad7143298ef925b6b2c80ab6';
const spotifySecret = '5e044bf177914eb3b2b04fc437c4d6d2';
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
    //  asynchronous verification.
    process.nextTick(function () {
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
    res.redirect('/');
  });

app.get('/', function(req, res) {
  // Only send the photo and name to the client side.
  let userInfo = req.user ? User.welcomeUser(req.user) : undefined;
  // Render the index view with a users photo an display name.
  res.render('index', { user: userInfo });
});

// Send main.js file when requested on with the html render.
app.get('/main.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/public/main.js'))
})

// Logout a user.
app.get('/logout', function(req, res) {
  // Destroy a users session and redirect to the homepage.
  req.logout();
  res.redirect('/');
});

app.post('/search', function(req, res) {
  console.log(req.body)
})
/******************************************************************/

app.listen(port);

console.log('listening at http://localhost8080');








