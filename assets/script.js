var userCityEl=document.getElementById('citysearch')
var searchButton=document.querySelector('.btn')

function getWeather(){
    var city=userCityEl.value.trim();
    fetch('https://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=1&appid=87b47c01e60a827a975548f9534bb2bf',)
    .then(function (response) {
        return response.json();
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
       previousSearches.push (userCity);
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
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//API key: 87b47c01e60a827a975548f9534bb2bf
