const express = require('express');
const app = express();
const path = require('path');
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


// For initial get request to the website, send back the main pages html.
app.get('/', function(req, res) {
  // Create absolute path from current file to the index.html file.
  res.status(200).sendFile(path.resolve(__dirname + '/../client/public/index.html'));
});

// When the brower reads the script tag in html file, it will request for the main.js file.
app.get('/main.js', function(req, res) {
  // Create absolute path from current file to the main.js file
  res.status(200).sendFile(path.resolve(__dirname + '/../client/public/main.js'));
});

// Have the server listen on local host 8080.
app.listen(8080);

console.log('listening at http://localhost8080')


