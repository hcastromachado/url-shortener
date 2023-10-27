const api = "http://localhost:3333/short";
const inputUrl = document.getElementById("full-url");
let short = document.getElementById("short-url");

async function createNewShortUrl() {
  if (inputUrl.value == "") {
    alert("Insert a Url");
  } else {
    try {
      const fullUrl = { originalUrl: inputUrl.value };

      const response = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullUrl),
      });

      inputUrl.value = "";

      const result = await response.json();
      console.log("json response:", result);

      await getCreatedUrls();
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

async function getCreatedUrls() {
  const address = "http://localhost:3333/urls";

  fetch(address, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      const url = data.pop().urlCode;

      short.textContent = url;
      short.setAttribute(
        "href",
        `http://localhost:3333/${url}`
      );
    });
}
