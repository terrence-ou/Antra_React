const ITEMS_PER_PAGE = 10;
let currIdx = 0;
let numPages = 1;
const htmlBody = document.querySelector("body");

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

    // DEV Part
    displayDataSlice(htmlBody, 0, data);
    createPaginationBar(numPages);
    // END
  });

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
  const heading = document.createElement("h1");
  const body = document.createElement("p");
  heading.textContent = item.title;
  body.textContent = item.body;
  elem.append(heading, body);
  return elem;
}

// Generate HTML data layout based on the current page number
function displayDataSlice(parentElement, pageNum, data) {
  const dataSlice = getDataSlice(pageNum, data);
  const dataElements = dataSlice.map((item) => createDataElement(item));
  parentElement.append(...dataElements);
}

function createPaginationBar(numPages) {
  const pageBar = document.createElement("div");

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
  pageButtons.forEach((button) => addButtonClickEvent(button));

  // Append pagination bar to the HTML
  pageBar.append(...pageButtons);
  htmlBody.appendChild(pageBar);
}

function addButtonClickEvent(button) {
  const buttonText = button.textContent;
  button.addEventListener("click", () => {
    if (buttonText === "Prev") {
      currIdx = Math.max(0, currIdx - 1);
    } else if (buttonText === "Next") {
      currIdx = Math.min(numPages, currIdx + 1);
    } else {
      currIdx = Number(buttonText);
    }
    console.log(currIdx);
  });
}
