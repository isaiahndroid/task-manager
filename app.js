const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// GET tasks
async function loadTasks() {
  const res = await fetch("http://localhost:3000/tasks");
  const tasks = await res.json();

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = task.text;

    // EDIT BUTTON (SAFE VERSION)
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", async () => {
      console.log("Edit clicked"); // DEBUG LINE

      const newText = prompt("Edit task:", task.text);
      if (!newText) return;

      await fetch(`http://localhost:3000/tasks/${index}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: newText })
      });

      loadTasks();
    });

    // DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", async () => {
      await fetch(`http://localhost:3000/tasks/${index}`, {
        method: "DELETE"
      });

      loadTasks();
    });

    li.appendChild(text);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// ADD task
addTaskBtn.addEventListener("click", async () => {
  const task = taskInput.value;

  await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: task })
  });

  taskInput.value = "";
  loadTasks();
});

loadTasks();