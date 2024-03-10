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
