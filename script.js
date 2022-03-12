const isDarkSelected = document.getElementById("theme");
const themeIcon = document.querySelector("[data-sun-moon]");
const inputForm = document.getElementById("task-input");
const newTaskInput = document.querySelector("[data-new-task]");
const taskTemplate = document.getElementById("task-template");
const tasksContainer = document.querySelector(".tasks-container");
isDarkSelected.addEventListener("change", () => {
  changeTheme(isDarkSelected.checked);
});

const createNewTask = (name) => {
  console.log(name);
  const taskElement = document.importNode(taskTemplate.content, true);
  // const checkBox = taskElement.querySelector("input");
  const taskName = taskElement.querySelector("[data-task-name]");
  const textNode = document.createTextNode(name);
  console.log(name, textNode);
  console.log(taskName, "is the task name selector working");
  taskName.append(textNode);
  console.log(taskName);
  tasksContainer.append(taskElement);
  // checkbox.id = task.id;
  // checkbox.checked = task.complete;
  // const label = taskElement.querySelector("label");
  // label.htmlFor = task.id;
  // label.append(task.name);
  // tasksContainer.appendChild(taskElement);
};

const removeAndDeleteTask = (e) => {
  // TODO and style display none to template
  // TODO remove the dom element
};

// function renderTasks(selectedList) {
//   selectedList.tasks.forEach((task) => {
//     const taskElement = document.importNode(taskTemplate.content, true);
//     const checkbox = taskElement.querySelector("input");
//     checkbox.id = task.id;
//     checkbox.checked = task.complete;
//     const label = taskElement.querySelector("label");
//     label.htmlFor = task.id;
//     label.append(task.name);
//     tasksContainer.appendChild(taskElement);
//   });
// }

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = newTaskInput.value.trim();
  newTaskInput.value = "";
  createNewTask(task);
});

function changeTheme(isDark) {
  let root = document.documentElement;
  if (!isDark) {
    /* light mode */
    themeIcon.setAttribute("src", "./images/icon-sun.svg");
    root.style.setProperty("--background-color", "hsl(0, 0%, 98%)");
    root.style.setProperty("--element-color", "white");
    root.style.setProperty("--font-color", "hsl(235, 21%, 11%)");
    root.style.setProperty(
      "--box-shadow-one",
      "rgba(0, 0, 0, 0.16) 0px 1px 4px"
    );
    return;
  }
  /* dark mode */
  themeIcon.setAttribute("src", "./images/icon-moon.svg");
  root.style.setProperty("--background-color", "hsl(235, 21%, 11%)");
  root.style.setProperty("--element-color", "hsl(235, 24%, 19%)");
  root.style.setProperty("--font-color", "hsl(0, 0%, 98%)");
  root.style.setProperty("--box-shadow-one", "none");
  // root.style.setProperty("--font-color", "hsl(0, 0%, 98%)");
}

// const taskCheckBox = document.querySelector(".check-task");
// console.log(taskCheckBox.checked);
// taskCheckBox.addEventListener("change", () => {
//   // console.log(taskCheckBox.checked);
// });

// console.log("connected");

// document.querySelector(".task-view").addEventListener("click", (e) => {
//   console.log(e.target);
//   console.log(taskCheckBox.checked);
// });
