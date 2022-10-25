var userCityEl=document.getElementById('citysearch')
var searchButton=document.querySelector('.btn')

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
        console.log (data);
        var currentCity= data.city.name;
        var cityHeading=document.getElementById('current-city')
        cityHeading.textContent=currentCity;
        for (var i=0, j=0; i<40; i +=8, j++){
            var iconCode= data.list[i].weather[0].icon;
            var iconUrl='http://openweathermap.org/img/wn/'+iconCode+'.png';
            var weatherDate=data.list[i].dt*1000;
            weatherDate=new Date(weatherDate);
           weatherDate=weatherDate.toLocaleString('en-US');
           weatherDate=weatherDate.slice(0,10);
           var temperature=data.list[i].main.temp;
           var windSpeed=data.list[i].wind.speed;
           var currentHumidity=data.list[i].main.humidity;
           if (i=0){
            console.log(weatherDate)
            dateHeading=document.getElementById('date-one');
            debugger
            dateHeading.textContent=weatherDate;
           }
           

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
       console.log(previousSearches);
       previousSearches.push(userCity);
       if (previousSearches.length >10){
        previousSearches=previousSearches.shift();
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
    saveSearch();
    getWeather();
    userCityEl.value='';
    
}
)
displaySearches();
//
//API key: 87b47c01e60a827a975548f9534bb2bf
