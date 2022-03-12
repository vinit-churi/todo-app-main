const isDarkSelected = document.getElementById("theme");

isDarkSelected.addEventListener("change", () => {
  changeTheme(isDarkSelected.checked);
});

function changeTheme(isDark) {
  let root = document.documentElement;
  if (!isDark) {
    /* light mode */
    root.style.setProperty("--background-color", "hsl(0, 0%, 98%)");
    root.style.setProperty("--element-color", "white");
    root.style.setProperty("--font-color", "hsl(235, 21%, 11%)");
    root.style.setProperty(
      "--box-shadow-one",
      "rgba(149, 157, 165, 0.2) 0px 8px 24px"
    );
  } else {
    /* dark mode */
    root.style.setProperty("--background-color", "hsl(235, 21%, 11%)");
    root.style.setProperty("--element-color", "hsl(235, 24%, 19%)");
    root.style.setProperty("--font-color", "hsl(0, 0%, 98%)");
    root.style.setProperty("--box-shadow-one", "none");
    // root.style.setProperty("--font-color", "hsl(0, 0%, 98%)");
  }
}

const taskCheckBox = document.querySelector(".check-task");
console.log(taskCheckBox.checked);
taskCheckBox.addEventListener("change", () => {
  // console.log(taskCheckBox.checked);
});

console.log("connected");

document.querySelector(".task-view").addEventListener("click", (e) => {
  console.log(e.target);
  console.log(taskCheckBox.checked);
});
