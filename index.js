const entryInput = document.getElementById("entry-input");
const entryList = document.getElementById("entry-list");
const entries = [
  {
    id: 1,
    text: "test 1",
    done: false,
  },
  {
    id: 2,
    text: "item 2",
    done: true,
  },
];

const checkbox = (id, value) => {
  if (value) {
    return `
            <div
            id="${id}"
            class="rounded-full h-6 w-6 check-color border border-light-greyish-blue hover:opacity-80"
            >
            <img
              src="images/icon-check.svg"
              alt="uncheck"
              class="m-auto h-full w-full p-[6px]"
            />
          </div>
            `;
  }
  return `<div id="${id}" class="rounded-full h-6 w-6 border border-light-greyish-blue hover:bg-light-greyish-blue-hover-dark"></div>`;
};

// load entries function
const loadEntries = () => {
  entryList.innerHTML = entries
    .map((entry) => {
      return `
      <div class="p-3 flex items-center gap-2">
          ${checkbox(entry.id, entry.done)}
          <div class="flex-1 truncate">
          ${entry.text}
          </div>

          <div
            id="${entry.id}"
            class="flex items-center p-1 hover:bg-light-greyish-blue-hover-dark"
          >
            <img src="/images/icon-cross.svg" alt="delete" />
          </div>
        </div>
      `;
    })
    .join("");
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

// Event listeners
document.addEventListener("DOMContentLoaded", loadEntries);

entryInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    console.log(entryList);
    addEntry();
  }
});
