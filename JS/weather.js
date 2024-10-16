const mapContainer = $("#map-container");
let countryP = $(".country");
let idP = $(".temp_c");
let latP = $("#lat");
let lonP = $("#lon");
let nameP = $(".name");
let regionP = $(".region");
let urlP = $(".url");
let humidity = $(".humidity");
let tz_id = $(".tz_id");
let wind_kph = $(".wind_kph");
let img = document.getElementById("weatherIcon");
let localTime = $("#local-time"); 


var map = L.map('map').setView([0, 0], 13);
var marker = L.marker([0, 0]).addTo(map); // Initialize the marker outside the function

getLocation();

function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

//--------------------------------------getCurrentPosition-----------------------------------
let latitude;
let longitude;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  fetchWeatherData(latitude + "," + longitude);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // Update marker position and map view
  marker.setLatLng([latitude, longitude]).update();
  map.setView([latitude, longitude], 13); // Set zoom level to 13
}

//-------------------------------------------handleSearch----------------------------------------
function handleSearch() {
  const location = document.getElementById("location-input").value;
  fetchWeatherData(location);
}

document.getElementById("search-button").addEventListener("click", handleSearch);

function fetchWeatherData(location) {
  $.ajax({
    method: "GET",
    url: `http://localhost:8081/weather/${location}`, // Call your Ballerina backend for weather data
    success: (data) => {
      // Update UI elements with data received from Ballerina
      countryP.text(data.location.country);
      idP.text(data.current.temp_c + "°C");
      latP.text(data.location.lat);
      lonP.text(data.location.lon);
      nameP.text(data.location.name);
      regionP.text(data.location.region);
      urlP.text(data.current.condition.text);
      humidity.text(data.current.humidity + "%");
      const [date, time] = data.location.localtime.split(' ');
      localTime.html(`Date: ${date}<br> Time: ${time}`);
      // Update map and marker position based on the new location
      let lat = data.location.lat;
      let lon = data.location.lon;

      // Update marker position and map view
      marker.setLatLng([lat, lon]).update();
      map.setView([lat, lon], 13); // Adjust the zoom level as needed
    },
    error: (jqXHR, textStatus, errorThrown) => {
      alert("Error fetching weather data. Please try again.");
      console.error("Error details:", textStatus, errorThrown);
    }
  });
}

//-------------------------------------------fetchNewsData--------------------------------------
function fetchNewsData() {
  $.ajax({
    url: "http://localhost:8081/WeatherNews", 
    method: "GET",
    success: (data) => {
      // Check if data.articles exists and is an array
      if (!data.articles || !Array.isArray(data.articles)) {
        console.error("Invalid news data:", data);
        alert("Invalid news data received.");
        return;
      }

      // Loop through the first 3 articles and update the UI
      data.articles.forEach((article, index) => {
        if (index < 3) { // Assuming you're displaying the top 3 articles
          // Update the image
          $(`#imgN${index + 1}`).attr("src", article.urlToImage);

          // Update the article link
          $(`#a${index + 1}`).attr("href", article.url);

          // Update the title
          $(`#title${index + 1}`).text(article.title);

          // Update the description
          $(`#p${index + 1}`).text(article.description);

          // Update the published time
          const publishedDate = new Date(article.publishedAt);
          const formattedDate = publishedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
          $(`#ptime${index + 1}`).text(`Last updated on ${formattedDate}`);
        }
      });
    },
    error: (xhr, status, error) => {
      console.error("Error fetching news:", error);
      alert("Failed to fetch news data.");
    }
  });
}

// Call the function when the document is ready
$(document).ready(function() {
  fetchNewsData();
});


//-------------------------------------------fetchforcast--------------------------------------

// Fetch weather forecast for the selected location and date range
function searchForecast() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const location = countryP.text();

  console.log("Start Date:", startDate, "End Date:", endDate);

  if (!startDate || !endDate) {
    alert("Please select both start and end dates.");
    return;
  }

  $.ajax({
    method: "GET",
    url: `http://localhost:8081/weatherForecast/${location}?start=${startDate}&end=${endDate}`,
    success: (data) => {
      console.log("Forecast data received:", data);  // Log the data to inspect it
      if (data.error) {
        console.error("Error fetching forecast data:", data.error);
        alert("Error fetching forecast data. Please try again.");
        return;
      }
      updateForecast(data.forecast, startDate, endDate);  // Update UI with forecast data
    },
    error: (jqXHR, textStatus, errorThrown) => {
      alert("Error fetching forecast data. Please try again.");
      console.error("Error details:", textStatus, errorThrown);
    }
  });
}



function getDateRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates = [];

  for (let dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
      dates.push(dt.toISOString().split('T')[0]); // Format the date as YYYY-MM-DD
  }

  return dates;
}

function updateForecast(forecast, startDate, endDate) {
  const forecastDays = forecast.forecastday;
  const dateRange = getDateRange(startDate, endDate); // Get the range of dates
  
  dateRange.forEach((date, index) => {
    const dayData = forecastDays.find(day => day.date === date); // Check if the data exists for this date
    
    if (dayData && index < 7) {  // If the day data exists and it's within the first 7 days
      document.getElementById(`date${index + 1}`).innerText = dayData.date;
      document.getElementById(`img${index + 1}`).src = dayData.day.condition.icon || 'path/to/default/icon.png';
      document.querySelector(`.title${index + 1}`).innerText = dayData.day.condition.text;
    } else {
      // Set default values or "No data" for missing days
      document.getElementById(`date${index + 1}`).innerText = "No data";
      document.getElementById(`img${index + 1}`).src = 'path/to/default/icon.png';
      document.querySelector(`.title${index + 1}`).innerText = "No forecast available";
    }
  });
}
