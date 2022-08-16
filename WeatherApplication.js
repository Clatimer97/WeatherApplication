//set variables
var cityInputEl= $("#city-input");
var searchHistory= []
var searchHistoryList = $("#search-history").append('<ul class="list-group"</ul>');
var today= moment().format("MM/DD/YY")
var units = "&units=imperial"
var key= "ae0807fd5c6da1633070096e76ea901f"
var url = "https://api.openweathermap.org/data/2.5/weather?q=";
var searchBtnEl = $(".searchBtn")

//function to get location data using geocoding API
function getLocation(event){
    event.preventDefault()
    var city= cityInputEl.val()
    console.log(city)
    var locationUrl= "http://api.openweathermap.org/geo/1.0/direct?q=" + city +"&limit=5&appid=ae0807fd5c6da1633070096e76ea901f"
    fetch (locationUrl)
    .then(function(locationResponse) {
        return locationResponse.json()
    })
    .then(function(data){
        console.log(data[0])
        var lat= data[0].lat
        var long = data[0].lon
         $("#city-name").text(data[0].name + " " + today)
        searchUVI(lat,long)
    })

    
    console.log(locationUrl)
  
}   

//function to get all of the current and future weather to dispaly
function searchUVI(lat, lon){
    var uviRequestUrl = ("https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon + units + "&exclude= hourly, minutely, alerts&appid=ae0807fd5c6da1633070096e76ea901f");
    fetch (uviRequestUrl)
    .then(function (response) {
        return response.json()
    })
    .then(function(data){
     $("#currentTemp").text(data.current.temp + "°F")
     $("#currentWindSpeed").text(data.current.wind_speed + "MPH")
     $("#currentHum").text(data.current.humidity + "%")
        var dailyUVCase = $("#currentUVI").text("UV Index: " + data.current.uvi);
        console.log(data)
        dailyUVCase.attr("id", "currentUV");
        var dailyUV = $("<span>").text(data.current.uvi);
        dailyUV.attr("id", "uv-index")
        // $("#city-details").append(dailyUVCase);
        // dailyUVCase.append(dailyUV)

        //if statements to set the color of the current weather UV Index
        if (data.current.uvi < 3){
            dailyUVCase.css("background-color", "green")
            dailyUVCase.css("color", "white")
        } else if (data.current.uvi >=3 && data.current.uvi <6){
            dailyUVCase.css("background-color", "yellow")
            dailyUVCase.css("color", "black")
        } else if (data.current.uvi >=6 &&data.current.uvi <8){
            dailyUVCase.css("background-color", "orange")
        } else if (data.current.uvi > 11){
            dailyUVCase.css("background-color", "red")
        }
       $("#h2-week").text("Five Day Forecast")
    //for loop to get all of the data for the future weather and create elements for them 
    for(i=1; i<6; i++){
        // let img = data.list[i].weather[1].icon 
        let div= $("<div>").addClass("dailyForecast");
        let date= $("<h3>").text(moment().add(i, "days"))
        let temp = $("<p>").text("Temp: " + data.daily[i].temp.day + "°F")
        let humidity = $("<p>").text("Humidity: " + data.daily[i].humidity+ "%")
        let windspeed  = $("<p>").text("Windspeed: " + data.daily[i].wind_speed + "MPH")
        let UvIndex = $("<p>").text("UV Index: " + data.daily[i].uvi)
    
    //same if statement for current UV index except with values substituted to allow for daily
     if (data.daily[i].uvi < 3){
            UvIndex.css("background-color", "green")
            UvIndex.css("color", "white")
        } else if (data.daily[i].uvi >=3 && data.current.uvi <6){
            UvIndex.css("background-color", "yellow")
            UvIndex.css("color", "black")
        } else if (data.daily[i].uvi >=6 &&data.current.uvi <8){
            UvIndex.css("background-color", "orange")
        } else if (data.daily[i].uvi > 11){
            UvIndex.css("background-color", "red")
    }

        //created divs for each set of weather data then appended all of the information to a larger container
        $("#weeklyForecast").append(div)
        //  div.append(img)
        div.append(date)
        div.append(temp)
        div.append(humidity)
        div.append(windspeed)
        div.append(UvIndex)
        
        

        
   
    }
    })
}

//event listener for the search button to initiate the get location function 
searchBtnEl.on("click", getLocation)

// function getInput(){
//     searchedCities = cityInputEl.val()
//     let searchHistory = JSON.parse(local)
// }

