const http = require('http');

const port = 8081;

const toDoList = ["Complete Node Byte", "Play Cricket"];

http
    .createServer((req, res) => {
        const {method, url} = req; //destructuring of request object
        if(url === "/todos"){
            if(method === "GET"){
                res.writeHead(200,{"Content-Type":"text/html"});
                res.write(toDoList.toString());             //converting array to string
            }else if(method === 'POST'){
                let body = ""; //variable to store data 
                req.on('error',(err) => {
                    console.error(err);
                }).on('data', (chunk) => {
                    body += chunk;
                }).on('end', () => {
                    body = JSON.parse(body);
                    console.log("data : ",body);
                })
            }
            else{
                res.writeHead(501);
            }
        }
        res.end();
    })
    .listen(port, () => {
    console.log(`Node.js server started on port ${port}`);
    });

    