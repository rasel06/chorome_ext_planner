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

  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = "YOUR_API_KEY";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const weatherElement = document.querySelector(".weather");
        weatherElement.textContent = `${data.weather[0].description}, ${data.main.temp}°C`;
      });
  });

  // Save to local storage
  function saveTasks(tasks) {
    chrome.storage.local.set({ tasks: tasks });
  }

  // Load tasks from local storage
  function loadTasks() {
    chrome.storage.local.get("tasks", function (data) {
      if (data.tasks) {
        data.tasks.forEach((task) => {
          const taskItem = document.createElement("li");
          taskItem.textContent = task;
          taskList.appendChild(taskItem);
        });
      }
    });
  }

  // Add tasks and save them
  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && taskInput.value.trim() !== "") {
      const taskItem = document.createElement("li");
      taskItem.textContent = taskInput.value;
      taskList.appendChild(taskItem);

      // Get the current task list and save
      const tasks = Array.from(document.querySelectorAll("#tasks li")).map(
        (item) => item.textContent
      );
      saveTasks(tasks);

      taskInput.value = "";
    }
  });

  // Load tasks on start
  loadTasks();
});
