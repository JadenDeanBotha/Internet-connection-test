//Variables
const image = document.getElementById("image");
const statusDisplay = document.getElementById("status");
const bgColor = document.getElementById("main");

const setColor = () => {
  bgColor.classList.add("online");
};

const connectionStatus = async () => {
  try {
    const fetchResults = await fetch(
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Lenna_%28test_image%29.png/440px-Lenna_%28test_image%29.png?time=" +
        new Date().getTime()
    );

    image.src = "./images/online.png";
    setColor();

    return fetchResults.status >= 200 && fetchResults.status < 300;
  } catch (error) {
    //console.log(error)
    statusDisplay.textContent = "Oops! Your internet connection is down";
    image.src = "./images/offline.png";
    bgColor.classList.remove("online");
  }
};

//Monitor the connection
setInterval(async () => {
  const result = await connectionStatus();
  if (result) {
    statusDisplay.textContent = "You are online!, Connection looks good";
    setColor();
  }
}, 5000);

//Check connection when the page loads
window.addEventListener("load", async (event) => {
  if (connectionStatus()) {
    statusDisplay.textContent = "You are online!";
  } else {
    statusDisplay.textContent = "You are offline!";
  }
});
