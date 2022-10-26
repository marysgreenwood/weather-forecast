var userCityEl=document.getElementById('citysearch')
var searchButton=document.querySelector('.btn')
var dateOne=document.getElementById('date-one');
var dateTwo=document.getElementById('date-two');
var dateThree=document.getElementById('date-three');
var dateFour=document.getElementById('date-four');
var dateFive=document.getElementById('date-five');
var fiveDayDates= [dateOne, dateTwo, dateThree, dateFour, dateFive]
var iconOne=document.getElementById('icon-one');
var iconTwo=document.getElementById('icon-two');
var iconThree=document.getElementById('icon-three');
var iconFour=document.getElementById('icon-four');
var iconFive=document.getElementById('icon-five');
var icons=[iconOne, iconTwo, iconThree, iconFour, iconFive];
var tempOne=document.getElementById('temp-one');
var tempTwo=document.getElementById('temp-two');
var tempThree=document.getElementById('temp-three');
var tempFour=document.getElementById('temp-four');
var tempFive=document.getElementById('temp-five');
var temps=[tempOne, tempTwo, tempThree, tempFour, tempFive];
var windOne=document.getElementById('wind-one');
var windTwo=document.getElementById('wind-two');
var windThree=document.getElementById('wind-three');
var windFour=document.getElementById('wind-four');
var windFive=document.getElementById('wind-five');
var windSpeeds=[windOne, windTwo, windThree, windFour, windFive];
var humidityOne=document.getElementById('humidity-one');
var humidityTwo=document.getElementById('humidity-two');
var humidityThree=document.getElementById('humidity-three');
var humidityFour=document.getElementById('humidity-four');
var humidityFive=document.getElementById('humidity-five');
var fiveDayHumidity=[humidityOne, humidityTwo, humidityThree, humidityFour, humidityFive]
function getWeather(){
    var city=userCityEl.value.trim();
    fetch('https://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=1&appid=87b47c01e60a827a975548f9534bb2bf',)
    .then(function (response) {
        return response.json();
      })
    .then (function (data){
        var cityLat=data[0].lat;
        var cityLon=data[0].lon;
       fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+cityLat+'&lon='+cityLon+'&units=imperial&appid=87b47c01e60a827a975548f9534bb2bf',)
       .then (function (response) {
        return response.json();
      })
    .then (function (data){
        //console.log (data);
        var currentCity= data.city.name;
        var cityHeading=document.getElementById('current-city')
        cityHeading.textContent=currentCity;
        var iconCode= data.list[0].weather[0].icon;
        var iconUrl='http://openweathermap.org/img/wn/'+iconCode+'.png';
        var currentIcon= document.getElementById('current-icon');
        currentIcon.setAttribute("src", iconUrl);
        var weatherDate=data.list[0].dt*1000;
        weatherDate=new Date(weatherDate);
        weatherDate=weatherDate.toLocaleString('en-US');
        weatherDate=weatherDate.slice(0,10);
        var currentDate=document.getElementById('current-date');currentDate.textContent= weatherDate;
        var temperature=data.list[0].main.temp;
        var currentTemp=document.getElementById('current-temp');
        currentTemp.textContent=temperature;
        var windSpeed=data.list[0].wind.speed;
        var currentWind=document.getElementById('current-wind');
        currentWind.textContent= windSpeed
        var currentHumidity=data.list[0].main.humidity;
        var humidityDisplay=document.getElementById('current-humidity');
        humidityDisplay.textContent=currentHumidity;
        for (var i=0, j=0; i<40; i +=8, j++){
            var iconCode= data.list[i].weather[0].icon;
            var iconUrl='http://openweathermap.org/img/wn/'+iconCode+'.png';
            icons[j].setAttribute("src", iconUrl);
            var weatherDate=data.list[i].dt*1000;
            weatherDate=new Date(weatherDate);
           weatherDate=weatherDate.toLocaleString('en-US');
           weatherDate=weatherDate.slice(0,10);
           fiveDayDates[j].textContent= weatherDate;
           var temperature=data.list[i].main.temp;
           temps[j].textContent=temperature;
           var windSpeed=data.list[i].wind.speed;
           windSpeeds[j].textContent= windSpeed
           var currentHumidity=data.list[i].main.humidity;
           fiveDayHumidity[j].textContent=currentHumidity;
           }
           

       
    })
    })
}
//save user input to local storage
function saveSearch(){
    var userCity= userCityEl.value.trim()
    if (userCity !== ''){
        var lastSearch=document.createElement("li")
       lastSearch.textContent=userCity
        lastSearch.setAttribute("class", "list-item")
        document.getElementById("previous-searches").appendChild (lastSearch);
       var previousSearches = JSON.parse (window.localStorage.getItem ('previousSearches')) || [];
       previousSearches.push(userCity);
       if (previousSearches.length >10){
        previousSearches.shift();
       }
       window.localStorage.setItem ('previousSearches', JSON.stringify (previousSearches))
      
    }
}

//display previous searches 
function displaySearches (){
    var previousSearches = JSON.parse(localStorage.getItem("previousSearches"))|| []; 
    if (previousSearches==[]){
        return;
    } else {
    for (var i=0; i<previousSearches.length; i++){
        var searchItem= document.createElement("li")
        searchItem.textContent=previousSearches[i]
        searchItem.setAttribute("class", "list-item")
        document.getElementById("previous-searches").appendChild (searchItem);
        }
    }
}


//eventListener when user clicks submit
searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    var results=document.querySelectorAll('.col-6')
    for (var i=0; i<results.length; i++){
        results[i].removeAttribute("hidden");

    }
    var mainDisplay=document.getElementById('main-display')
    mainDisplay.removeAttribute('hidden')
    saveSearch();
    getWeather();
    userCityEl.value='';
    
}
)

/*function to display weather for search history
document.ul.child.addEventListener("click", function(event){
    event.preventDefault();
    userCityEl.value=target.textContent;
    var results=document.querySelectorAll('.col-6')
    for (var i=0; i<results.length; i++){
        results[i].removeAttribute("hidden");

    }
    var mainDisplay=document.getElementById('main-display')
    mainDisplay.removeAttribute('hidden')
    saveSearch();
    getWeather();
    userCityEl.value='';
})*/
displaySearches();


//
//API key: 87b47c01e60a827a975548f9534bb2bf
