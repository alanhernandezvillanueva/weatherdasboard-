var searchButtonEl = document.querySelector(".btn")
var currentCityNameEl = document.querySelector("#current-city-name");
var currentCityWeatherEl = document.querySelector("#current-weather");
var searchCityEl = document.querySelector("#entercity");
var fiveWeatherEl = document.querySelector("#five-day-weather")
var dict = {};

//create a fucntion to accept data input 

getFiveDayWeatherData = function (city) {
    var fiveDayWeatherApi = `HTTPS://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=78997b58c6d829d305a731ef5afb29ed`;
    fetch(fiveDayWeatherApi).then(function (response) {
        return response.json()
         }).then(function (data) {
             console.log(data);
             showFiveDayForecast(data);
             
         })
        }
    

//create an API call to access data 
var getWeatherData = function(city){
    var apiUrl = `HTTPS://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=78997b58c6d829d305a731ef5afb29ed`;
    fetch(apiUrl).then(function (response) {
        return response.json()
    }) .then(function (data) {
        console.log(data);
        displayCityWeather(data);
        
    });
    
}
searchButtonEl.addEventListener("click", function(event) {
    if (searchCityEl.value === "" || searchCityEl.value === null) {
        alert("Enter a Valid City Name.")
        return false;
    }
    event.preventDefault()
    var typedCity = searchCityEl.value;
    getWeatherData(typedCity);
    getFiveDayWeatherData(typedCity);
    searchCityEl.value= "";
     var cityName = document.createElement("button");
     cityName.classList.add("cityNameBtn")
     cityName.textContent = typedCity;
     currentCityNameEl.append(cityName);
     localStorage.setItem("getWeatherData", "displayCityWeather");
     
} 
);
currentCityNameEl.addEventListener("click", function(event) {
    event.preventDefault()
    var clickedCity = event.target.textContent;
    getWeatherData(clickedCity);
    getFiveDayWeatherData(clickedCity);
    localStorage.setItem(getWeatherData, getFiveDayWeatherData)
}
);

var saveCities = function() {
    localStorage.setItem("cities", JSON.stringify(city));
  };


 //create a function to diplay the currentcity weather 
 var displayCityWeather = function (data) {

     
    currentCityWeatherEl.innerHTML = "";
    currentCityWeatherEl.classList.add("currentweatherdiv")
   
    var cityName = document.createElement("h1");
    cityName.textContent = data.name;
    currentCityWeatherEl.append(cityName);
    


    var temperature = document.createElement("h2");
    temperature.textContent = "Temp: " + data.main.temp +"°";
    currentCityWeatherEl.append(temperature);
    temperature.style.margin = "20px 0 20px 0"

    var windSpeed =  document.createElement("h2");
    windSpeed.textContent = "Wind: " + data.wind.speed + " miles per hour";
    currentCityWeatherEl.append(windSpeed);
    windSpeed.style.margin = "20px 0 20px 0"
    

    
    var cityHumidity = document.createElement("h2");
    cityHumidity.textContent = "Humidity " + data.main.humidity + "%";
    currentCityWeatherEl.append(cityHumidity);
    cityHumidity.style.margin = "20px 0 20px 0"
    
    
 if (data.main.temp > 30){
    
    return true;
}
}


 function showFiveDayForecast(data) {
    var selectedCity = searchCityEl.value;
    var index = dict[selectedCity];
    
    
    var fiveDaysCards = `<div><h1>${data.city.name}  Five Day Forecast</h1></div>`
   
        for (var i = 0; i < data.list.length; i+=8) {
           fiveDaysCards += ` <div class="card" style="width: 18rem;">
  <ul class="list-group list-group-flush">
    <li class="list-group-item"> Temperature: ${data.list[i].main.temp}°</li>
    <li class="list-group-item">Wind Speed: ${data.list[i].wind.speed} miles per hour</li>
    <li class="list-group-item"> Humidity: ${data.list[i].main.humidity}%</li>
  </ul>
</div>`        
        }
    fiveWeatherEl.innerHTML = fiveDaysCards
    
 }