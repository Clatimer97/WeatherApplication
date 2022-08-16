# WeatherApplication

## Description of Project
The purpose of this project is to create an interactive weather application using API calls and JQuery. It should display the current weather of the city searched and a five day forecast.

## Functionality
[HTML]
* Created a form for the search engine using `<aside>`, `<form>`, and `<input>`
* Created a section for the current weather information to go into
* Created a large container for all the day divs to go into once they had been created
* Linked JQuery, Bootstrap, javascript, and CSS

[CSS]
* Manipulated some of the CSS using Bootstrap
* Added in daily div properties to style each one 
* Added in other properties dynamically through JQuery

[JQuery]
* `getLocation()` is the function used to get the actual coordinates of the city from the Weather API
* Using the first API call, I got the data point for latitude and longitude and set the text value to whatever city was searched
* In addition, I passed in `searchUVI()` so that it would run the rest of my code once the first function ran
* `uviRequestURL` is the URL I used to get all of my weather data
* Using the data returned from the API call, I set the values for the current weather in the main headlining case
* By using if/else if statements, I set the parameters for color coding the UV index so that it would change colors based on the severity
* In the following for loop, I set the data points for the next five days of weather
* Using the same if/else if statements, I set the parameters for the UV index for future weather 
* Using the `.append()` method, I appended all of the newly created elements onto the daily forecast div, which is the main container for all of the daily divs 