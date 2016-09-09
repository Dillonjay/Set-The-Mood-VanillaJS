const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Middleware for parsing any incoming json.
app.use(bodyParser.json());
// Middleware for parsing any incoming cookies.
app.use(cookieParser());


// For initial get request to the website, send back the main pages html.
app.get('/', function(req, res){
  res.status(200).sendFile(path.resolve(__dirname + '/../client/public/index.html'));
});
// When the brower reads the script tag in html file, it will request for the main.js file.
app.get('/main.js', function(req, res){
  res.status(200).sendFile(path.resolve(__dirname + '/../client/public/main.js'));
});


app.listen(8080);
console.log('listening at http://localhost8080')


