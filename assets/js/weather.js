
$(document).ready(function(){
   getWeatherData();
})

function getWeatherData() {
    var xhr = new XMLHttpRequest();
    //url gets data for aviemore coordinates, api key, and then the "metric" pulls them in celcius rather than ke
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=57.06&lon=-3.6061&appid=422a169bc688adda6305539c7e845ffd&units=metric"
  //var weatherJSON = [];
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let weatherResponse = (JSON.parse(this.responseText));
            setWeatherData(weatherResponse); 
        }
    };
    xhr.open("GET", url);
    xhr.send();
} 

function setWeatherData(weatherResponse) {
    let tempRounded = Math.round(weatherResponse.main.temp, 1)
    let weatherIconCode = weatherResponse.weather[0].icon 
    //uncomment below line to test different weather codes
        //let weatherIconCode = "11d" 
        //01d = clear; 02d, 03d, 04d = clouds; 09d, 10d = rain; 11d = thunderstorm; 13d = snow; 50d = mist;  
    let weatherIconURL =  `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
    setModalGif(weatherIconCode);
    setModalWeather(tempRounded, weatherIconCode, weatherIconURL);
} 

function setModalGif(weatherIconCode) {
    let weatherIconTrunc = weatherIconCode.substring(0, 2);
    if (weatherIconCode.charAt(2) == "d") {  
        if (weatherIconTrunc == 01) {
            $("#weather").addClass("gifClear-bg");
            $("#weather-variable-text").html("With all the great weather we're having, we'd love for you to join us on tomorrow's mini adventure.");
        }
        else if (weatherIconTrunc == 02) {
            $("#weather").addClass("gifLightCloud-bg");
            $("#weather-variable-text").html("Want to experience the magic of climbing through the clouds? Join us on tomorrow's mini adventure.");
        }
        else if (weatherIconTrunc == 03 || weatherIconTrunc == 04 ) {
            $("#weather").addClass("gifCloud-bg");
            $("#weather-variable-text").html("Want to experience the magic of climbing through the clouds? Join us on tomorrow's mini adventure.");
        }
        else if (weatherIconTrunc == 09 || weatherIconTrunc == 10) {
            $("#weather").addClass("gifRain-bg");
            $("#weather-variable-text").html("A little rain adds to this dramatic landscape. Join us on tomorrow's mini adventure.");
        }
        else if (weatherIconTrunc == 11) {
            $("#weather").addClass("gifThunder-bg");
            $("#weather-variable-text").html("Thunderstorms may have put a stop to today's adventures, but we'd love to arrange something for another day.");
            $("#time-variable-text").html(":")
        } 
        else if (weatherIconTrunc == 13) {
            $("#weather").addClass("gifSnow-bg");
            $("#weather-variable-text").html("Scotland in the snow? Join us on tomorrow's mini adventure");
        } 
        else {
            $("#weather").addClass("gifMist-bg");
            $("#weather-variable-text").html("Want to experience the magic of climbing above the mist? Join us on tomorrow's mini adventure.");
        }
    } 
    else {
        $("#weather").addClass("gifNight-bg");
        $("#weather-variable-text").html("We're closed right now but there's still time to join us on tomorrow's mini adventure!");
        $("#time-variable-text").html(" tomorrow");
    }
} 

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