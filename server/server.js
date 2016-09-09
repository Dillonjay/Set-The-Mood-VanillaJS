const express = require('express');
const app = express();
const path = require('path')



app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../client/public/index.html'));
});

app.listen(8080);
console.log('listening at http://localhost8080')


