const themeSwitch = document.getElementById("theme-switch");
const entryInput = document.getElementById("entry-input");
const entryList = document.getElementById("entry-list");
const itemNumber = document.getElementById("items-number");
const navigators = document.querySelectorAll(".navigator");
const clearButton = document.getElementById("clear");
const html = document.documentElement;
let entries = [];
let listStatus = "all";

const checkbox = (id, value) => {
  if (value) {
    return `
            <div
            id="${id}"
            class="rounded-full h-6 w-6 check-color border border-light-greyish-blue hover:opacity-80 checkbox"
            >
            <img
              src="images/icon-check.svg"
              alt="uncheck"
              id="${id}"
              class="m-auto h-full w-full p-[6px]"
            />
          </div>
            `;
  }
  return `<div id="${id}" class="rounded-full h-6 w-6 border border-light-greyish-blue dark:border-darker-greyish-blue hover:bg-light-greyish-blue-hover-dark dark:hover:bg-dark-greyish-blue-dark checkbox"></div>`;
};

// load entries function
const loadEntries = () => {
  let displayedEntries;
  if (listStatus === "active") {
    displayedEntries = entries.filter((entry) => entry.done === false);
  } else if (listStatus === "completed") {
    displayedEntries = entries.filter((entry) => entry.done === true);
  } else {
    displayedEntries = entries;
  }

  entryList.innerHTML = displayedEntries
    .map((entry) => {
      return `
      <div class="p-4 flex items-center gap-2 dark:bg-darker-desaturated-blue-dark dark:text-light-greyish-blue-dark">
          ${checkbox(entry.id, entry.done)}
          <div class="flex-1 truncate ${
            entry.done ? "line-through text-dark-greyish-blue" : ""
          }">
          ${entry.text}
          </div>

        
        <img src="images/icon-cross.svg" alt="delete" id="${entry.id}"
        class="flex items-center p-1 rounded hover:bg-light-greyish-blue-hover-dark dark:hover:bg-dark-greyish-blue-dark delete"/>
        </div>
      `;
    })
    .join("");

  // add event listeners for delete and checkbox buttons to new element
  document.querySelectorAll(".delete").forEach((deleteButton) => {
    deleteButton.addEventListener("click", deleteEntry);
  });

  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.addEventListener("click", toggleEntry);
  });

  //  Change items number
  itemNumber.textContent = entries.filter(
    (entry) => entry.done === false
  ).length;
};

const addEntry = () => {
  const entry = entryInput.value;
  if (entry) {
    const newEntry = {
      id: randomId(),
      text: entry,
      done: false,
    };
    entries.push(newEntry);

    loadEntries();
    entryInput.value = "";
  }
};

const deleteEntry = (event) => {
  const id = event.target.id;
  const newEntries = entries.filter((entry) => entry.id !== id);

  entries = newEntries;
  loadEntries();
};

const toggleEntry = (event) => {
  const id = event.target.id;
  const entryIndex = entries.findIndex((entry) => entry.id === id);

  if (entries[entryIndex].done) {
    entries[entryIndex].done = false;
  } else {
    entries[entryIndex].done = true;
  }

  loadEntries();
};

// generate random id
const randomId = () => {
  const letters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const id = ["#"];
  for (let i = 0; i < 8; i++) {
    id.push(letters[Math.floor(Math.random() * letters.length)]);
  }
  return id.join("");
};

// navigate function
const navigate = (event) => {
  const id = event.target.id;

  selectedNavigators = document.querySelectorAll(`#${id}`);
  selectedNavigators.forEach((navigator) =>
    navigator.classList.add("selected")
  );

  navigators.forEach((element) => {
    if (element.id !== id) {
      element.classList.remove("selected");
    }
  });

  listStatus = id;
  loadEntries();
};

// clear completed entries function
const clearCompleted = (event) => {
  const newEntries = entries.filter((entry) => entry.done === false);

  entries = newEntries;
  loadEntries();
};

// Event listeners
document.addEventListener("DOMContentLoaded", loadEntries);

themeSwitch.addEventListener("click", (event) => {
  event.preventDefault();
  html.classList.toggle("dark");
});

entryInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addEntry();
  }
});

navigators.forEach((navigator) => {
  navigator.addEventListener("click", navigate);
});

clearButton.addEventListener("click", clearCompleted);
