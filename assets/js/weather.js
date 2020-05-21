
$(document).ready(function(){
   getWeatherData();
})

//function calls weather data from OpenWeather API
function getWeatherData() {
    var xhr = new XMLHttpRequest();
    //url gets data for aviemore coordinates, api key, and then the "metric" pulls them in celcius rather than ke
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=57.06&lon=-3.6061&appid=422a169bc688adda6305539c7e845ffd&units=metric"
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let weatherResponse = (JSON.parse(this.responseText));
            setWeatherData(weatherResponse); 
        }
    };
    xhr.open("GET", url);
    xhr.send();
} 
//preparing weather response data 
function setWeatherData(weatherResponse) {
    let tempRounded = Math.round(weatherResponse.main.temp, 1)
    let weatherIconCode = weatherResponse.weather[0].icon 
    //comment above line and uncomment below line to test different weather codes
        //let weatherIconCode = "01n" 
        //01d = clear; 02d, 03d, 04d = clouds; 09d, 10d = rain; 11d = thunderstorm; 13d = snow; 50d = mist;  
    let weatherIconURL =  `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
    setModalGif(weatherIconCode);
    setModalWeather(tempRounded, weatherIconCode, weatherIconURL);
} 
//use weather response data prepared above to set the modal gif and content
function setModalGif(weatherIconCode) {
    let weatherIconTrunc = weatherIconCode.substring(0, 2);
    if (weatherIconCode.charAt(2) == "d") {  
        if (weatherIconTrunc == 01) {
            $("#weather").addClass("gifClear-bg");
            $("#weather-header").html("The sun is up, the sky is blue");
        }
        else if (weatherIconTrunc == 02) {
            $("#weather").addClass("gifLightCloud-bg");
            $("#weather-header").html("Climb Through the Clouds");
        }
        else if (weatherIconTrunc == 03 || weatherIconTrunc == 04 ) {
            $("#weather").addClass("gifCloud-bg");
            $("#weather-header").html("Climb Through the Clouds");
        }
        else if (weatherIconTrunc == 09 || weatherIconTrunc == 10) {
            $("#weather").addClass("gifRain-bg");
            $("#weather-header").html("Rain isn't an Obstacle");
        }
        else if (weatherIconTrunc == 11) {
            $("#weather").addClass("gifThunder-bg");
            $("#weather-header").html("The Storm will Pass");
        } 
        else if (weatherIconTrunc == 13) {
            $("#weather").addClass("gifSnow-bg");
            $("#weather-header").html("Let it Snow");
        } 
        else {
            $("#weather").addClass("gifMist-bg");
            $("#weather-header").html("Climb through the Clouds");
        }
    } 
    else {
        $("#weather").addClass("gifNight-bg");
        $("#weather-header").html("We're closed right now");
        $("#call-text").html("Call Tomorrow");
    }
} 
//use weather response data prepared above to display weather icon and temperature in modal

function setModalWeather(tempRounded, weatherIconCode, weatherIconURL) {
    if (weatherIconCode.charAt(2) == "d") {
        $("#weather-img").html(`<img src="${weatherIconURL}"/>`);
        $("#weather-temp").html(`${tempRounded}°C`); 
    }
    else {
         //night icon always to be moon icon
        $("#weather-img").html('<img src="' + "https://openweathermap.org/img/wn/01n@2x.png" + '" />');
    }
}