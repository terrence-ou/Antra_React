/* ========== Global variables ========== */
const ITEMS_PER_PAGE = 10;

let currIdx = 0;
let numPages = 1;
let fullData = null;

const htmlMain = document.querySelector("main");
const pageNavDiv = document.querySelector(".pagenav");

/* ========== DOM Manipulation ========== */

// First fetch data from the URL
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => {
    if (response.ok) return response.json();
    else
      throw new Error(
        "Failed to fetch data, please check the url or the nerwork"
      );
  })
  .catch((error) => console.log(error))
  .then((data) => {
    numPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    fullData = data;

    // Handling contents
    displayDataSlice(htmlMain, 0, data);
    createPaginationBar(numPages);
    setButtonState();
  });

/* ========== Helper Functions ========== */

// Get the data slice based on current page number
function getDataSlice(pageNum, data) {
  const startIdx = pageNum * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIdx + ITEMS_PER_PAGE, data.length);
  const dataSlice = data.slice(startIdx, endIndex);
  return dataSlice;
}

// Convert a single data element to an HTML element
function createDataElement(item) {
  const elem = document.createElement("div");
  elem.className = "card";
  const title = document.createElement("h2");
  const info = document.createElement("p");
  const index = document.createElement("i");
  title.textContent = item.title;
  title.className = "card__title";
  info.textContent = item.body;
  info.className = "card__info";
  index.textContent = `Item ID: ${item.id}`;
  index.className = "card__id";
  elem.append(title, index, info);
  return elem;
}

// Generate HTML data layout based on the current page number
function displayDataSlice(parentElement, pageNum, data) {
  htmlMain.innerHTML = "";
  const dataSlice = getDataSlice(pageNum, data);
  const dataElements = dataSlice.map((item) => createDataElement(item));
  parentElement.append(...dataElements);
}

function createPaginationBar(numPages) {
  // Create page navigations buttons
  const prevButton = document.createElement("button");
  const nextButton = document.createElement("button");
  const indexButtons = new Array(numPages).fill(0).map((_, i) => {
    const button = document.createElement("button");
    button.textContent = i + 1;
    return button;
  });
  prevButton.textContent = "Prev";
  nextButton.textContent = "Next";

  // Create event listeners for each button
  const pageButtons = [prevButton, ...indexButtons, nextButton];
  pageButtons.forEach((button) => {
    button.className = "pagenav__btn";
    addButtonClickEvent(button);
  });

  // Append pagination bar to the HTML
  pageNavDiv.append(...pageButtons);
}

function addButtonClickEvent(button) {
  const buttonText = button.textContent;
  button.addEventListener("click", () => {
    if (buttonText === "Prev") {
      currIdx = Math.max(0, currIdx - 1);
    } else if (buttonText === "Next") {
      currIdx = Math.min(numPages - 1, currIdx + 1);
    } else {
      currIdx = Number(buttonText) - 1;
    }
    displayDataSlice(htmlMain, currIdx, fullData);
    setButtonState();
  });
}

// Set button's display color and clickability based on the current index
function setButtonState() {
  const buttons = document.querySelectorAll(".pagenav__btn");
  buttons.forEach((button) => {
    button.classList.remove("pagenav__btn-current");
    button.disabled = false;
    if (Number(button.textContent) - 1 === currIdx) {
      button.classList.add("pagenav__btn-current");
      button.disabled = true;
    }

    if (currIdx === 0 && button.textContent === "Prev") {
      button.disabled = true;
    }
    if (currIdx === numPages - 1 && button.textContent === "Next") {
      button.disabled = true;
    }
  });
}
