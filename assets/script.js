var userCityEl=document.getElementById('citysearch')
var searchButton=document.querySelector('.btn')


function saveSearch(){
    var userCity= userCityEl.value.trim()
    if (userCity !== ''){
       var previousSearches = JSON.parse (window.localStorage.getItem ('previousSearches')) || [];
       previousSearches.push (userCity);
       window.localStorage.setItem ('previousSearches', JSON.stringify (previousSearches))
      
    }
}

function displaySearches (){
    var previousSearches = JSON.parse(localStorage.getItem("previousSearches")); 
    for (var i=0; i<previousSearches.length; i++){
        var searchItem= document.createElement("li")
        searchItem.textContent=previousSearches[i]
        searchItem.setAttribute("class", "list-item")
        console.log(searchItem)
        document.getElementById("previous-searches").appendChild (searchItem);
    }
}
displaySearches();
searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    saveSearch();
}
)