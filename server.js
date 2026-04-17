const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

//Get all tasks 
app.get("/tasks", (req, res) => {
    res.json(tasks);
});


// POST new task 
app.post("/tasks", (req, res) => {
    const newTask = req.body; 
    tasks.push(newTask);
    res.json(newTask);
});

// DELETE task
app.delete("/tasks/:index", (req, res) => {
    const index = req.params.index;
    tasks.splice(index, 1);
    res.json({ message: "Task deleted"});
});

app.listen(3000, () => {
    console.log("server running on port 3000");
});