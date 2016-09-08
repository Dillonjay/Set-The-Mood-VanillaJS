let http = require('http');

let port = 8080;

let ip = "127.0.0.1";

let server = http.createServer(function(req,res){
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write("<!DOCTYPE html>");
  res.write("<html>");
  res.write("<head>");
  res.write("<title>Hello World Page</title>");
  res.write("</head>");
  res.write("<body>");
  res.write("Hello World!");
  res.write("</body>");
  res.write("</html>");
  res.end();
})

console.log("Listening on http://localhost:" + port);
server.listen(port, ip);
