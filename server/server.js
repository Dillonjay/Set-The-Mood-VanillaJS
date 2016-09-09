const http = require('http');
const fs = require('fs')

const port = 8080;

const ip = "127.0.0.1";

const server = http.createServer(function (request, response) {
  console.log(request.method, request.url)
  // console.log("Headers:", request.headers)

  // Look up request.on('data', ...)
  console.log("Request body?", request.body)

  if ( request.method === 'GET' && request.url === '/hello' ) {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end(`hello`)
  }
  else if ( request.method === 'GET' && request.url === '/' ) {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end(`
      <h1>HomePage</h1>
    `)
  }
  else {
    response.writeHead(404, {})
    response.end('not found.')
  }
});
console.log("Listening on http://localhost:" + port);
server.listen(port, ip);
