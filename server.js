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
                    let newToDo = toDoList;
                    newToDo.push(body.item);
                    console.log(newToDo);
                    // res.writeHead(201);
                });
            }else if(method == "DELETE"){
                let body = "";
                req.on('error',(err) => {
                    console.error(err);
                }).on('data',(chunk) => {
                    body += chunk;
                }).on('end',() => {
                    body = JSON.parse(body);
                    let deleteThis = body.item;

                    // for(let i=0; i< toDoList.length; i++){
                    //     if(toDoList[i] === deleteThis){
                    //         toDoList.splice(i,1);
                    //         break;
                    //     }
                    // }

                    toDoList.find((ele, index) => {
                        if(ele === deleteThis){
                            toDoList.splice(index,1);
                        }
                    })
                    // res.writeHead(202);
                })
            }
            else{
                res.writeHead(501);
            }
        }else{
            res.writeHead(404);
        }
        res.end();
    })
    .listen(port, () => {
    console.log(`Node.js server started on port ${port}`);
    });

    