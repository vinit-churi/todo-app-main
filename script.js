/* task buttons */
const inputForm = document.getElementById("task-input");
const deleteButton = document.querySelector(".delete-image");
const newTaskInput = document.querySelector("[data-new-task]");
/* the filter buttons */
const AllButtons = document.getElementsByClassName("all");
const ActiveButtons = document.getElementsByClassName("active");
const CompletedButtons = document.getElementsByClassName("completed");
/* theme switcher */
const isDarkSelected = document.getElementById("theme");
const themeIcon = document.querySelector("[data-sun-moon]");
const taskTemplate = document.getElementById("task-template");
const tasksContainer = document.querySelector(".tasks-container");
// console.log(AllButtons);

/*=====================
  Theme switcher
 ======================*/
isDarkSelected.addEventListener("change", () => {
  changeTheme(isDarkSelected.checked);
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
}

const mockLocalStorage = [
  {
    id: "id1",
    name: "the first item",
    isCompleted: false,
  },
  {
    id: "id2",
    name: "the second item",
    isCompleted: false,
  },
  {
    id: "id3",
    name: "the third item",
    isCompleted: false,
  },
];

/*=====================
  initialize the data from local storage or an empty list
 ======================*/

//  let lists = JSON.parse(localStorage.getItem("tasks.list")) || [];
let list = mockLocalStorage;

(() => {
  // console.log(list);
  list.forEach((listItem) => {
    // console.log(listItem);
    saveAndRender(listItem);
  });
})();

/*=====================
  save and render tasks
 ======================*/

function saveAndRender(taskObj) {
  save(taskObj);
  render(taskObj);
}

function save(taskObj) {
  // save to local storage and update the global list array
  console.log("will save the obj to localStorage", taskObj);
  list.push(taskObj);
  console.log(list);
}

function render(taskObj) {
  const { name, isCompleted, id } = taskObj;
  /* importing the template node */
  const taskElement = document.importNode(taskTemplate.content, true);
  /* adding data attribute to the list item */
  const listItem = taskElement.querySelector(".task-container-item");
  listItem.dataset.isCompleted = isCompleted;
  listItem.dataset.id = id;
  /* adding todo name to the  list item*/
  const taskName = taskElement.querySelector("[data-task-name]");
  const textNode = document.createTextNode(name);
  taskName.append(textNode);
  tasksContainer.append(taskElement);
}

/*=====================
  add input to task container
 ======================*/

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = newTaskInput.value.trim();
  newTaskInput.value = "";
  const taskObj = {
    id: Date.now().toString() + Math.floor(Math.random() * 90 + 10).toString(),
    name: task,
    isCompleted: false,
  };
  saveAndRender(taskObj);
});

/*=====================
  delete the list item and save new data
  ======================*/

tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-image")) {
    const clickedThing = event.target;
    const parentLi = clickedThing.parentElement.parentElement;
    const itemId = parentLi.dataset.id;
    parentLi.parentElement.removeChild(parentLi);
    console.log(itemId);
    const newList = list.filter((listItem) => listItem.id != itemId);
    console.log(newList);
    // console.log(list);
  }
});

/*=====================
    update the status
    ======================*/
// console.log(Date.now().toString());

// // localStorage.setItem("tasks", []);
// localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
// const createNewTask = (name) => {
//   const prevData = localStorage.getItem("tasks");
//   if (!(prevData === null)) {
//     localStorage.setItem("tasks", JSON.stringify([...prevData, name]));
//     appendRenderedList([...prevData, name]);
//   }
//   appendRenderedList([name]);
//   console.log("is run");
//   // const taskElement = document.importNode(taskTemplate.content, true);
//   // const taskName = taskElement.querySelector("[data-task-name]");
//   // const textNode = document.createTextNode(name);
//   // taskName.append(textNode);
//   // tasksContainer.append(taskElement);
// };

// const appendRenderedList = (arr) => {
//   if (arr.length === 0) return;
//   arr.forEach((name) => {
//     const taskElement = document.importNode(taskTemplate.content, true);
//     const taskName = taskElement.querySelector("[data-task-name]");
//     const textNode = document.createTextNode(name);
//     taskName.append(textNode);
//     tasksContainer.append(taskElement);
//     if (localStorage.getItem("tasks") === null) {
//       localStorage.setItem("tasks", JSON.stringify([]));
//     }
//     const prevData = localStorage.getItem("tasks");
//     localStorage.setItem("tasks", JSON.stringify([...prevData, name]));
//   });
// };

// const removeAndDeleteTask = (e) => {
//   // TODO and style display none to template
//   // TODO remove the dom element
// };

// tasksContainer.addEventListener("change", (event) => {
//   if (event.target.classList.contains("check-task")) {
//     const clickedThing = event.target;
//     const parentLi = clickedThing.parentElement.parentElement;
//     // parentLi.style.display = "none";
//     // console.dir(clickedThing);
//     console.dir(clickedThing.parentElement.parentElement);
//   }
// });

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
