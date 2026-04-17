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
    li.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = async () => {
      await fetch(`http://localhost:3000/tasks/${index}`, {
        method: "DELETE"
      });
      loadTasks();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

const editBtn = document.createElement("button");
editBtn.textContent = "Edit";

editBtn.onclick = async () => {
  const newText = prompt("Edit task:", task.text);

  await fetch(`http://localhost:3000/tasks/${index}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: newText })
  });

  loadTasks();
};

li.appendChild(editBtn);




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