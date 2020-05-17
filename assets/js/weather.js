
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
    //uncomment these lines to test different weather codes
       // let weatherIconCode = "50d" 
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
        }
        else if (weatherIconTrunc == 02) {
            $("#weather").addClass("gifLightCloud-bg");
        }
        else if (weatherIconTrunc == 03 || weatherIconTrunc == 04 ) {
            $("#weather").addClass("gifCloud-bg");
        }
        else if (weatherIconTrunc == 09 || weatherIconTrunc == 10) {
            $("#weather").addClass("gifRain-bg");
        }
        else if (weatherIconTrunc == 11) {
            $("#weather").addClass("gifThunder-bg");
        } 
        else if (weatherIconTrunc == 13) {
            $("#weather").addClass("gifSnow-bg");
        } 
        else {
            $("#weather").addClass("gifMist-bg");
        }
    } 
    else {
        $("#weather").addClass("gifNight-bg");
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