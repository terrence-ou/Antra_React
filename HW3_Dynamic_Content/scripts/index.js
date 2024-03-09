const ITEMS_PER_PAGE = 10;
let currIdx = 0;
let numPages = 1;

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
    console.log(data);
  });

// Get the data slice based on current page number
function getDataSlices(pageNum, data) {
  const startIdx = pageNum * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIdx + ITEMS_PER_PAGE, data.length);
  const dataSlice = data.slice(startIdx, endIndex);
  return dataSlice;
}

// Convert a single data element to an HTML element
function createDataElement(item) {
  const { userId, id, body, title } = item;
  const elem = document.createElement("div");
  // elem.classList.add();
}
