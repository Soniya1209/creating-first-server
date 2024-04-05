const http = require('http');

const port = 8081;

http
    .createServer((require, response) => {
        response.writeHead(200, {'Conten-Type': 'text/html'});
        response.write("<h1>hello! This is from my server</h1>");
        response.end();
    })
    .listen(port, () => {
    console.log(`Node.js server started on port ${port}`);
    });

    // npm rum