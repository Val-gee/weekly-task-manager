var currentDate = document.getElementById("currentDate"); ``
var currentTime = document.getElementById("currentTime");
var startBtn = document.getElementById('start-time') //for the add event listner to start timer
var pauseBtn = document.getElementById('pause'); //for the add event listener to the puase button
//timer button
var timerButton = document.querySelector(".timer");
var wasClicked = false;


//countdown variables 
var secondsLeft = 0;
var minutesLeft = 60;
var countdown = document.getElementById("countdown");

//greeting
var greeting = document.getElementById("greeting");

//prints date and time every second
function currentDayInfo() {

    var currentDay = dayjs();
    var time = currentDay.format("h:mm a");
    var todayFormatted = currentDay.format("dddd, MMM D");

    currentDate.textContent = todayFormatted;
    currentTime.textContent = time;
    return;
}

//sets interval every second to refresh date, time, and message
var infoInterval = setInterval(currentDayInfo, 1000);
var greetingInterval = setInterval(customizedGreeting, 1000);

//customized greeting based on time of day
function customizedGreeting() {
    var today = dayjs();
    var hour = today.format("HH");
    var hourArray = [dayjs().hour(05), dayjs().hour(12), dayjs().hour(17), dayjs().hour(21)];

    if ((hour >= hourArray[0].format("HH")) && (hour < hourArray[1].format("HH"))) {
        greeting.textContent = "Good Morning!";
    } else if ((hour >= hourArray[1].format("HH")) && (hour < hourArray[2].format("HH"))) {
        greeting.textContent = "Good Afternoon!";
    } else if ((hour >= hourArray[2].format("HH")) && (hour < hourArray[3].format("HH"))) {
        greeting.textContent = "Good Evening!";
    } else if (hour >= hourArray[3].format("HH") || hour < hourArray[0].format("HH")) {
        greeting.textContent = "Good Night!";
    }
}

//productivity timer

var timerInterval;
var isPaused = false;
function resumeTimer() {
    secondsLeft--;
    if (secondsLeft === -1) {
        secondsLeft = 59;
        minutesLeft--
    } else if (secondsLeft < 10) {
        secondsLeft = "0" + secondsLeft;
    }

    if (minutesLeft === -1) {
        clearInterval(timerInterval);
        secondsLeft = 60;
        minutesLeft = 59;
        alert("Time is up!");
        wasClicked = false;
        if (wasClicked === false) {
            startBtn.disabled = false;
        }
        countdown.textContent = "";
        return;
    }
    if (wasClicked === true) {
        startBtn.disabled = true;
    }
    countdown.textContent = minutesLeft + ":" + secondsLeft;
}

startBtn.addEventListener("click", timer);
function timer() {
    wasClicked = true;
    timerInterval = setInterval(resumeTimer, 1000);
    



   

}
pauseBtn.addEventListener('click', function () {
    console.log(isPaused);
    if (isPaused) {
        isPaused = false;
        var resume = setInterval(resumeTimer, 1000);
        
    } else {
        isPaused = true;
        clearInterval(timerInterval);
       

    }

    
});






//gets user's browser location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayWeather);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

//creates API URL based on browser location and loads weather content on page
function displayWeather(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var requestWeather = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=87e0914af1422e36fd0e0a7774720d6f";
    fetch(requestWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var currentCity = data.city.name;
            var currentTemp = data.list[0].main.temp;
            var currentTempFahrenheit = ((currentTemp - 273.15) * 9 / 5 + 32).toFixed(0);
            var currentWeatherIcon = data.list[0].weather[0].icon;
            var weatherIcon = document.getElementById("weatherIcon");
            var imageURL = "https://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png";
            var cityAndTemp = document.getElementById("currentWeather");

            cityAndTemp.textContent = currentCity + " " + currentTempFahrenheit + "\u00B0F";
            weatherIcon.setAttribute("src", imageURL);
        });
}

currentDayInfo();
customizedGreeting();
getLocation();


