const express = require("express");

//initialization
const app = express();
app.use(express.json());         //application will now use json format for data

const port = 8081;
const toDoList = ["Complete Node Byte", "Play Cricket"];

//  http://localhost:8081/todos
app.get("/todos", (req, res) => {
    //callback
    res.status(200).send(toDoList);
});

app.post("/todos", (req, res) => {
    let newToDoItem = req.body.item;
    toDoList.push(newToDoItem);
    res.status(201).send({
        message : "Task added successfully",
    });
});

app.delete("/todos", (req, res) => {
    const itemToDelete = req.body.item;

    toDoList.find((ele, idx) => {
        if(ele === itemToDelete){
            toDoList.splice(idx, 1);
        }
    });

    res.status(202).send({
        message: `Deleted task is "${itemToDelete}"`,
    });
});

// app.get("/todos/create", () => {})
// app.post("/todos/create", () => {})

//put, patch, all other methods that are not implemented
app.all("/todos", (req, res) => {
    res.status(501).send();
});

//all other routes except todos
app.all('*', (req, res) => {
    res.status(404).send();
});

app.listen(port, () => {
    console.log(`Node.js server started at port ${port}`)
});