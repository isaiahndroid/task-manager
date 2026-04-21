const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST task
app.post("/tasks", (req, res) => {
  const newTask = { text: req.body.text };
  tasks.push(newTask);
  res.json(newTask);
});

// PUT update task
app.put("/tasks/:index", (req, res) => {
  const index = req.params.index;

  if (tasks[index]) {
    tasks[index].text = req.body.text;
    res.json(tasks[index]);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// DELETE task
app.delete("/tasks/:index", (req, res) => {
  const index = req.params.index;
  tasks.splice(index, 1);
  res.json({ message: "Task deleted" });
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});