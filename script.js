let addTasks = document.getElementById("add-tasks");
let tasks = document.getElementById("tasks");
let btnEdit = document.querySelectorAll(".ri-edit-2-fill");
let btnDelete = document.querySelectorAll(".ri-delete-bin-5-fill");
let btncheck = document.querySelectorAll(".ri-checkbox-circle-fill");

local();

let ts = [
  {
    title: "مهامي",
    date: "15/2/2022",
    isDone: false,
  },
];

function reapete() {
  tasks.innerHTML = "";
  let index = 0;
  for (t of ts) {
    tasks.innerHTML += `<div class="task ${t.isDone ? "done" : ""}">
    <div class="task-content">
      <div class="content">
        <h2>${t.title}</h2>
        <div class="date">
          <i class="ri-calendar-todo-fill calender-todo"></i>
          <p>${t.date}</p>
        </div>
      </div>
      <div class="icons">
        <i onclick='deleteTask(${index})' class="ri-delete-bin-5-fill"></i>
        <i onclick='checkTask(${index})'  class="ri-checkbox-circle-fill ${
      t.isDone ? "active" : ""
    }"></i>
        <i onclick='editTask(${index})' class="ri-edit-2-fill"></i>
      </div>
    </div>
  </div>`;
    index++;
  }
}

ts = JSON.parse(localStorage.getItem("tasks"));
reapete();

addTasks.addEventListener("click", () => {
  let now = new Date();
  let date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} `;
  let tasksInput = prompt("الرجاء ادخال عنوان المهمة");

  let taskObj = {
    title: tasksInput,
    date: date,
    isDone: false,
  };

  if (tasksInput != null && tasksInput != "") {
    ts.push(taskObj);
    storeTasks();
    reapete();
  }
});

function deleteTask(index) {
  let tasks = ts[index];
  let con = confirm(`هل انت متأكد من حذف مهمه : ${tasks.title}`);

  if (con == true) {
    ts.splice(index, 1);
    storeTasks();
    reapete();
  }
}

function editTask(index) {
  let task = ts[index];
  let newTaskTitle = prompt("ادخال عنوان المهمه الجديدة", task.title);

  if (newTaskTitle != null && newTaskTitle != "") {
    task.title = newTaskTitle;
    storeTasks();
    reapete();
  }
}

function checkTask(index) {
  let task = ts[index];
  if (task.isDone) {
    task.isDone = false;
  } else {
    task.isDone = true;
  }
  storeTasks();
  reapete();
}

function storeTasks() {
  let tasksString = JSON.stringify(ts);
  localStorage.tasks = tasksString;
}


function local() {
  if (localStorage.getItem("tasks") == null) {
    localStorage.setItem("tasks", `[]`);
  }
}
