const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Middleware for parsing any incoming json.
app.use(bodyParser.json());
// Middleware for parsing any incoming cookies.
app.use(cookieParser());



app.get('/', function(req, res){
  res.sendStatus(200)
  // res.sendFile(path.resolve(__dirname + '/../client/public/index.html'));
});

app.listen(8080);
console.log('listening at http://localhost8080')


