document.addEventListener("DOMContentLoaded", function () {
  // Set a random background image
  document.body.style.backgroundImage = `url(https://source.unsplash.com/random)`;

  // Display greeting based on time of day
  const hours = new Date().getHours();
  const greetingElement = document.querySelector(".greeting");
  if (hours < 12) {
    greetingElement.textContent = "Good Morning!";
  } else if (hours < 18) {
    greetingElement.textContent = "Good Afternoon!";
  } else {
    greetingElement.textContent = "Good Evening!";
  }

  // Fetch and display a motivational quote
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".quote").textContent = data.content;
    });

  // To-do list functionality
  const taskInput = document.getElementById("new-task");
  const taskList = document.getElementById("tasks");
  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && taskInput.value.trim() !== "") {
      const taskItem = document.createElement("li");
      taskItem.textContent = taskInput.value;
      taskList.appendChild(taskItem);
      taskInput.value = "";
    }
  });

  // Weather update (optional)
  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const weatherElement = document.querySelector(".weather");
        weatherElement.textContent = `${data.weather[0].description}, ${data.main.temp}°C`;
      });
  });
});
