const taskinput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Get tasks
async function loadTasks() {
    const res = await fetch("http://localhost:3000/tasks");
    const tasks = await res.json();

    taskList.innerHTML = "";

    tasks.foreach((task, index) => {
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

// ADD task

addTaskBtn.addEventListener("click", async () => {
    const task = taskinput.value; 

    await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({text: task})
    });

    taskinput.value = "";
    loadTasks();
});

loadTasks();

    