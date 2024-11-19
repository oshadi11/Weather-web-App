const API_KEY = "df1f1e0c2e624ec2b9b144536242303";
const Geoloaction_API_KEY = "462f2ca150f24384a9f4bac0a58ba181";
const hrs = document.getElementById("hrs");
const min = document.getElementById("min");
const date = document.getElementById("date");
let Data;

let search = () => {
    let value = document.getElementById("search-bar").value;

    let url = `https://api.weatherapi.com/v1/forecast.json?key=df1f1e0c2e624ec2b9b144536242303&q=${value}&days=5&aqi=no&alerts=no`;
    fetch(url).
        then(res => res.json()).
        then(data => {
            Data = data;
            getWeather(data);
            setForecast(data);
            changeColor();
        })
}
let searchInput = document.getElementById("search-bar");
searchInput.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault(); //stop other default functions when enter pressed
        search();
    }
});


let getWeather = (data) => {
    console.log(data.location.name);
    console.log(data.location.country);
    console.log(data.current.temp_c);
    document.getElementById("city-name").innerHTML = data.location.name;
    document.getElementById("country-name").innerHTML = data.location.country;
    document.getElementById("temp").innerHTML = data.current.temp_c + `&deg;C`;
    document.getElementById("temp-txt").innerHTML = data.current.condition.text;
    document.querySelector(".weather-condition-img").src = data.current.condition.icon;
    document.getElementById("humidity").innerHTML = data.current.humidity + "%";
    document.getElementById("wind-speed").innerHTML = data.current.wind_mph + " mph";
    document.getElementById("pressure").innerHTML = data.current.pressure_in + " in";
    console.log(data.location.localtime);


}
let getTime = () => {
    setInterval(() => {
        let currentDate = new Date();
        hrs.innerHTML = currentDate.getHours();
        if (currentDate.getMinutes() < 10) {
            min.innerHTML = "0" + currentDate.getMinutes();
        } else {
            min.innerHTML = currentDate.getMinutes();
        }
    }, 1000);

}
let setForecast = (data) => {
   
    let upcomingDays = getUpcomingDates();
    document.getElementById("date").innerHTML = getMonthName(upcomingDays[0]) + " " + upcomingDays[0].getDate() + " " + upcomingDays[0].getFullYear();
    document.getElementById("day1").innerHTML = getMonthName(upcomingDays[0]) + " " + upcomingDays[0].getDate();
    document.getElementById("day2").innerHTML = getMonthName(upcomingDays[1]) + " " + upcomingDays[1].getDate();
    document.getElementById("day3").innerHTML = getMonthName(upcomingDays[2]) + " " + upcomingDays[2].getDate();

    document.getElementById("next-day1-temp").innerText =  data.forecast.forecastday[0].day.avgtemp_c + `°C`;
    document.getElementById("next-day2-temp").innerHTML =   data.forecast.forecastday[1].day.avgtemp_c + `°C`;
    document.getElementById("next-day3-temp").innerHTML =   data.forecast.forecastday[2].day.avgtemp_c + `°C`;
  
    console.log(data.forecast.forecastday);

    document.querySelector(".day1-weather-icon").src = data.forecast.forecastday[0].day.condition.icon;
    document.querySelector(".day2-weather-icon").src = data.forecast.forecastday[1].day.condition.icon;
    
    document.querySelector(".day3-weather-icon").src = data.forecast.forecastday[2].day.condition.icon;
    console.log(data.forecast.forecastday[1].day.avgtemp_c);
    console.log(data.current.condition.icon); // For current weather icon
console.log(data.forecast.forecastday[1].day.condition.icon); // For forecast icons


}
function changeColor() {
    document.body.style.backgroundColor = "black";
}

function getUpcomingDates() {
    var dates = [];
    var today = new Date();
    for (var i = 0; i < 7; i++) {
        var nextDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
        dates.push(nextDate);
    }
    return dates;
}
function getMonthName(date) {
    var months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return months[date.getMonth()];
}
let setLocation = () => {
    let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${Geoloaction_API_KEY}`;
    fetch(url).
        then(res => res.json()).
        then(data => {
            getLocation(data);
            search();

        })
}


let getLocation = (data) => {
    document.getElementById("search-bar").value = data.city;
    getTime();
}



function changeThemeColor() {
    const bacgroundColors = ["linear-gradient(60deg, rgb(81, 122, 246) 35%, rgb(87, 172, 237) 100%)", "radial-gradient(circle at 10% 20%, rgb(236, 158, 248) 0%, rgb(131, 83, 241) 90.1%)", "linear-gradient(109.6deg, rgb(255, 207, 84) 11.2%, rgb(255, 158, 27) 91.1%)", "linear-gradient(109.6deg, rgb(47, 204, 102) 11.2%, rgb(98, 197, 89) 91.7%)"];
    const weatherForecastBgColor = ["linear-gradient(181deg, rgb(2, 0, 97) 15%, rgb(60, 140, 245) 158.5%)", "linear-gradient(181deg, #2d0646 15%,#8344b6 158.5%)", "linear-gradient(181deg, #f87000f7 15%, #f9d423 158.5%)", "linear-gradient(181deg, #06461c 15%,#63c85d 158.5%)"];
    var radioButtons = document.getElementsByName('theme');
    for (let index = 0; index < radioButtons.length; index++) {
        if (radioButtons[index].checked) {
            document.body.style.background = bacgroundColors[index];
            document.querySelector(".container-4").style.background = weatherForecastBgColor[index];
            document.querySelector(".settings-body").style.background = bacgroundColors[index];
        }

    }

}

function changeTempUnit() {
    var radioButtons = document.getElementsByName('tempUnit');
    for (let index = 0; index < radioButtons.length; index++) {
        if (radioButtons[0].checked) {
            document.getElementById("temp").innerHTML = Data.current.temp_c + `&deg;C`;
            document.getElementById("next-day1-temp").innerText = "|    " + Data.forecast.forecastday[1].day.avgtemp_c + `°C`;
            document.getElementById("next-day2-temp").innerHTML = "|    " + Data.forecast.forecastday[2].day.avgtemp_c + `°C`;
            document.getElementById("next-day3-temp").innerHTML = "|    " + Data.forecast.forecastday[3].day.avgtemp_c + `°C`;
            document.getElementById("next-day4-temp").innerHTML = "|    " + Data.forecast.forecastday[4].day.avgtemp_c + `°C`;
            console.log("Celcius");
        } else if (radioButtons[1].checked) {
            document.getElementById("temp").innerHTML = Data.current.temp_f + `&deg;F`;
            document.getElementById("next-day1-temp").innerText = "|    " + Data.forecast.forecastday[1].day.avgtemp_f + `°F`;
            document.getElementById("next-day2-temp").innerHTML = "|    " + Data.forecast.forecastday[2].day.avgtemp_f + `°F`;
            document.getElementById("next-day3-temp").innerHTML = "|    " + Data.forecast.forecastday[3].day.avgtemp_f + `°F`;
            document.getElementById("next-day4-temp").innerHTML = "|    " + Data.forecast.forecastday[4].day.avgtemp_f + `°F`;
            console.log("fahrenheit");
        }

    }

}
