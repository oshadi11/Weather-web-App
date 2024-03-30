const API_KEY = "df1f1e0c2e624ec2b9b144536242303";
const Geoloaction_API_KEY = "462f2ca150f24384a9f4bac0a58ba181";
const hrs =document.getElementById("hrs");
const min =document.getElementById("min");
const date =document.getElementById("date");


let search = ()=>{
    let value = document.getElementById("search-bar").value;
    
    let url = `https://api.weatherapi.com/v1/forecast.json?key=df1f1e0c2e624ec2b9b144536242303&q=${value}&days=5&aqi=no&alerts=no`;
    fetch(url).
    then(res=> res.json()).
    then(data => {
        getWeather(data);
        getTime();
        setForecast(data);
        changeColor();
    })
}

let getWeather = (data)=>{
    console.log(data.location.name);
    console.log(data.location.country);
    console.log(data.current.temp_c);
    document.getElementById("city-name").innerHTML = data.location.name;
    document.getElementById("country-name").innerHTML = data.location.country;
    document.getElementById("temp").innerHTML = data.current.temp_c+`&deg;C`;
    document.getElementById("temp-txt").innerHTML = data.current.condition.text;
    document.querySelector(".weather-condition-img").src = data.current.condition.icon;
    document.getElementById("humidity").innerHTML = data.current.humidity+"%";
    document.getElementById("wind-speed").innerHTML = data.current.wind_mph+" mph";
    document.getElementById("pressure").innerHTML = data.current.pressure_in+" in";
    console.log(data.location.localtime);
    
    
}
let getTime = ()=>{
    setInterval(() => {
        let currentDate = new  Date();
        hrs.innerHTML =currentDate.getHours();
        min.innerHTML =currentDate.getMinutes();  
    }, 1000);
    
}
let setForecast = (data)=>{
 let upcomingDays = getUpcomingDates();
    document.getElementById("day1").innerHTML = getMonthName(upcomingDays[0])+" "+upcomingDays[0].getDate(); 
    document.getElementById("day2").innerHTML = getMonthName(upcomingDays[1])+" "+upcomingDays[1].getDate(); 
    document.getElementById("day3").innerHTML = getMonthName(upcomingDays[2])+" "+upcomingDays[2].getDate(); 
    document.getElementById("day4").innerHTML = getMonthName(upcomingDays[3])+" "+upcomingDays[3].getDate(); 
    document.getElementById("next-day1-temp").innerText = "|    "+data.forecast.forecastday[1].day.avgtemp_c+`°C`;
    document.getElementById("next-day2-temp").innerHTML = "|    "+data.forecast.forecastday[2].day.avgtemp_c+`°C`;
    document.getElementById("next-day3-temp").innerHTML = "|    "+data.forecast.forecastday[3].day.avgtemp_c+`°C`;
    document.getElementById("next-day4-temp").innerHTML = "|    "+data.forecast.forecastday[4].day.avgtemp_c+`°C`;
    document.querySelector("#day1-weather-icon").src = data.forecast.forecastday[1].day.condition.icon; 
    document.querySelector("#day2-weather-icon").src = data.forecast.forecastday[2].day.condition.icon; 
    document.querySelector("#day3-weather-icon").src = data.forecast.forecastday[3].day.condition.icon; 
    document.querySelector("#day4-weather-icon").src = data.forecast.forecastday[4].day.condition.icon; 
    console.log(data.forecast.forecastday[1].day.avgtemp_c);
     
}
function changeColor() {
    document.body.style.backgroundColor = "black";
}

function getUpcomingDates() {
    var dates = [];
    var today = new Date(); // Get today's date
    for (var i = 0; i < 7; i++) {
      var nextDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000); // Incrementing date by one day
      dates.push(nextDate); // Pushing the date into the array
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
let setLocation =()=>{
    let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${Geoloaction_API_KEY}`;
    fetch(url).
    then(res=> res.json()).
    then(data=> {
        getLocation(data);
        search();
     
    })
}

let getLocation=(data)=>{
    document.getElementById("search-bar").value=data.city;
}
  


function changeThemeColor() {
    const bacgroundColors = ["linear-gradient(60deg, rgb(81, 122, 246) 35%, rgb(87, 172, 237) 100%)", "radial-gradient(circle at 10% 20%, rgb(236, 158, 248) 0%, rgb(131, 83, 241) 90.1%)", "linear-gradient(109.6deg, rgb(245, 95, 152) 11.2%, rgb(254, 148, 136) 100.2%)", "linear-gradient(109.6deg, rgb(102, 203, 149) 11.2%, rgb(39, 210, 175) 98.7%)"];
    const weatherForecastBgColor=["linear-gradient(181deg, rgb(2, 0, 97) 15%, rgb(60, 140, 245) 158.5%)","linear-gradient(181deg, #2d0646 15%,#8344b6 158.5%)","linear-gradient(to top, #5f72bd 0%, #7a14be 100%)","linear-gradient(to top, #5f72bd 0%, #7a14be 100%)"];
    var radioButtons = document.getElementsByName('theme');
    for (let index = 0; index < radioButtons.length; index++) {
        if(radioButtons[index].checked){
            document.body.style.background =bacgroundColors[index];
            document.querySelector(".container-4").style.background = weatherForecastBgColor[index];
        }
        
    }
    
}
