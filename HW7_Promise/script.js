// Promises

const promise = new Promise((resolved, rejected) => {
  const isValid = Math.random() > 0.5;
  if (isValid) resolved("Succeeded, the random value is larger than 0.5");
  else rejected("Failed, the random value is smaller than 0.5");
})
  .then((message) => console.log(message))
  .catch((error) => console.log(error));

const recordVideoOne = new Promise((resolved, rejected) => {
  resolved("Video 1 Recorded");
});

const recordVideoTwo = new Promise((resolved, rejected) => {
  resolved("Video 2 Recorded");
});

const recordVideoThree = new Promise((resolved, rejected) => {
  resolved("Video 3 Recorded");
});

Promise.all([recordVideoOne, recordVideoTwo, recordVideoThree]).then(
  (messages) => messages.forEach((message) => console.log(message))
);

Promise.race([recordVideoOne, recordVideoTwo, recordVideoThree]).then(
  (message) => console.log(message)
);

// Fetch
const BASE_URL = "https://jsonplaceholder.typicode.com/";

async function logMovies() {
  try {
    const response = await fetch(BASE_URL + "users");
    if (!response.ok)
      throw new Error("failed to fetch data, please check the url");
    const users = await response.json();
    console.log(users);
  } catch (error) {
    console.error(error);
  }
}

logMovies();

async function postData(data) {
  try {
    const response = await fetch(BASE_URL + "posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("failed to post data");
  } catch (error) {
    console.error(error);
  }
}

postData({ username: "example" });
