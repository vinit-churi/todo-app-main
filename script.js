/* root */
const root = document.documentElement;
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
/* tasks count display */
const taskCountDisplay = document.querySelector(".status");
/* clear completed */
const clearCompletedTask = document.querySelector(".clear");

const LOCAL_STORAGE_LIST_KEY = "tasks.list";
const LOCAL_STORAGE_IS_DARK = "tasks.theme";

/*=====================
 All, active, completed buttons | filtering the list 
 ======================*/

[...AllButtons].forEach((button) => {
  button.classList.add("button-active");
  button.addEventListener("click", () => {
    button.classList.add("button-active");
    root.style.setProperty("--display-completed-false", "flex");
    root.style.setProperty("--display-completed-true", "flex");
    [...ActiveButtons, ...CompletedButtons].forEach((button) => {
      button.classList.remove("button-active");
    });
  });
});

[...ActiveButtons].forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("button-active");
    root.style.setProperty("--display-completed-false", "flex");
    root.style.setProperty("--display-completed-true", "none");
    [...AllButtons, ...CompletedButtons].forEach((button) => {
      button.classList.remove("button-active");
    });
  });
});

[...CompletedButtons].forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("button-active");
    root.style.setProperty("--display-completed-false", "none");
    root.style.setProperty("--display-completed-true", "flex");
    [...AllButtons, ...ActiveButtons].forEach((button) => {
      button.classList.remove("button-active");
    });
  });
});

/*=====================
  Theme switcher
 ======================*/
isDarkSelected.addEventListener("change", () => {
  changeTheme(isDarkSelected.checked);
});

const isDark = JSON.parse(localStorage.getItem(LOCAL_STORAGE_IS_DARK)) || false;
// console.log(isDark);
changeTheme(isDark);
function changeTheme(isDark) {
  if (!isDark) {
    /* light mode */
    localStorage.setItem(LOCAL_STORAGE_IS_DARK, false);

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
  localStorage.setItem(LOCAL_STORAGE_IS_DARK, true);
  themeIcon.setAttribute("src", "./images/icon-moon.svg");
  root.style.setProperty("--background-color", "hsl(235, 21%, 11%)");
  root.style.setProperty("--element-color", "hsl(235, 24%, 19%)");
  root.style.setProperty("--font-color", "hsl(0, 0%, 98%)");
  root.style.setProperty("--box-shadow-one", "none");
}

/*=====================
  initialize the data from local storage or an empty list
 ======================*/

//  let lists = JSON.parse(localStorage.getItem("tasks.list")) || [];
let list = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

(() => {
  // console.log(list);
  list.forEach((listItem) => {
    // console.log(listItem);
    console.log(listItem);
    render(listItem);
    // const li = document.getElementById(String(listItem.id));
    // console.log(li);
    // li.querySelector(".check-task").checked = listItem.isCompleted;
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
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(list));
  console.log(list);
  updateCount();
}

function render(taskObj) {
  const { name, isCompleted, id } = taskObj;
  /* importing the template node */
  const taskElement = document.importNode(taskTemplate.content, true);
  /* adding data attribute to the list item */
  const listItem = taskElement.querySelector(".task-container-item");
  const checkBoxStatus = taskElement.querySelector(".check-task");
  checkBoxStatus.checked = isCompleted;
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
    list = newList;
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(list));

    updateCount();
    console.log(newList);
    // console.log(list);
  }
});

/*=====================
    update the status
    ======================*/
tasksContainer.addEventListener("change", (event) => {
  if (event.target.classList.contains("check-task")) {
    const clickedThing = event.target;
    const parentLi = clickedThing.parentElement.parentElement;
    const itemId = parentLi.dataset.id;
    console.log(itemId);
    console.log(clickedThing.checked);
    const updateList = list.map((listObj) => {
      if (listObj.id === itemId) {
        parentLi.dataset.isCompleted = clickedThing.checked;
        return { ...listObj, isCompleted: clickedThing.checked };
      }
      return listObj;
    });
    list = updateList;
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(list));

    updateCount();
    console.log(updateList);
  }
});

/*=====================
    update count and clear completed
    ======================*/
function updateCount() {
  const totalItems = list.length;
  const activeItems = list.reduce((previousValue, currentValue) => {
    if (currentValue.isCompleted === false) return previousValue + 1;
    return previousValue + 0;
  }, 0);
  const singleOrPlural = activeItems === 1 ? "task" : "tasks";
  taskCountDisplay.innerText = `${activeItems} ${singleOrPlural} remaining`;
  return { activeItems, totalItems };
}
updateCount();
clearCompletedTask.addEventListener("click", () => {
  const newList = list.filter((item) => {
    if (item.isCompleted === true) {
      const id = item.id;
      console.log(id, typeof id);
      const element = document.querySelector(
        "[data-id=" + "'" + id + "'" + "]"
      );
      console.log(element, "this is element");
      element.remove();
    } else {
      return item;
    }
  });

  console.log(newList);
  list = newList;
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(list));
});
