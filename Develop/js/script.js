
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

//to-do list inputs
var selectedDay = document.getElementById("day");
var inputText = document.querySelector(".inputText");
var sendBtn = document.querySelector(".sendBtn");
var options = selectedDay.options;

//content areas
var toDoList = document.querySelector(".toDoList");
var sunday = document.querySelector(".sunday");
var monday = document.querySelector(".monday");
var tuesday = document.querySelector(".tuesday");
var wednesday = document.querySelector(".wednesday");
var thursday = document.querySelector(".thursday");
var friday = document.querySelector(".friday");
var saturday = document.querySelector(".saturday");

//initial input array
var inputArray = [[],[],[],[],[],[],[],[]];

//gets save data from local storage and parses into array
var savedString = localStorage.getItem("item-array");
var savedArray = JSON.parse(savedString);

//if there is save data, inputArray will include it
if (savedArray != null) {
    inputArray = savedArray;
}

//prints input text to page based on user input and saves in local storage
sendBtn.addEventListener("click", function(event) {
    
    event.preventDefault();
    
    //creates new elements to display user input
    var listItem = document.createElement("li");
    var itemDelete = document.createElement("button");

    //vars with user input
    var selectedIndex = selectedDay.selectedIndex;
    var selectedValue = options[selectedIndex].value;
    var input = inputText.value;

    //styling for content being created
    listItem.textContent = input;
    listItem.style.display = "inline";
    listItem.style.margin = "0 5px 0 0";
    itemDelete.style.backgroundImage = "url('Develop/images/x-button.png')";
    itemDelete.style.backgroundSize = "contain";
    itemDelete.style.borderStyle = "none";
    itemDelete.style.backgroundColor = "none";
    itemDelete.style.width = "18px";
    itemDelete.style.height = "18px";

    //appends new elements in appropriate area of page
    if (selectedValue === "toDo") {
        toDoList.appendChild(listItem);
        toDoList.appendChild(itemDelete);
        inputArray[0].push(input);
    } else if (selectedValue === "sunday") {
        sunday.appendChild(listItem);
        sunday.appendChild(itemDelete);
        inputArray[1].push(input);
    } else if (selectedValue === "monday") {
        monday.appendChild(listItem);
        monday.appendChild(itemDelete);
        inputArray[2].push(input);
    } else if (selectedValue === "tuesday") {
        tuesday.appendChild(listItem);
        tuesday.appendChild(itemDelete);
        inputArray[3].push(input);
    } else if (selectedValue === "wednesday") {
        wednesday.appendChild(listItem);
        wednesday.appendChild(itemDelete);
        inputArray[4].push(input);
    } else if (selectedValue === "thursday") {
        thursday.appendChild(listItem);
        thursday.appendChild(itemDelete);
        inputArray[5].push(input);
    } else if (selectedValue === "friday") {
        friday.appendChild(listItem);
        friday.appendChild(itemDelete);
        inputArray[6].push(input);
    } else {
        saturday.appendChild(listItem);
        saturday.appendChild(itemDelete);
        inputArray[7].push(input);
    }

    //converts newly-modified inputArray to JSON and saves in local storage 
    var inputArrayFormatted = JSON.stringify(inputArray);
    localStorage.setItem("item-array", inputArrayFormatted);
    
    //deletes to-do task from page and updates local storage
    function deleteItem() {
    
        var thisItemText = listItem.textContent;
        listItem.remove();
        itemDelete.remove();
        for (var x = 0; x < inputArray.length; x++) {
            for (var i = 0; i < inputArray[x].length; i++) {
                var selectedItem = inputArray[x][i];
                if (selectedItem == thisItemText) {
                    inputArray[x].splice(i, 1);    
                }
            }
        }
        inputArrayFormatted = JSON.stringify(inputArray);
        localStorage.setItem("item-array", inputArrayFormatted);
    }
    itemDelete.addEventListener("click", deleteItem);
});

//prints saved data to page on load
function printLocalStorage() {

    //nested for loop to scan 2D array
    for (var x = 0; x < inputArray.length; x++) {
        for (var i = 0; i < inputArray[x].length; i++) {
            
            //current item being scanned in for loop
            var selectedItem = inputArray[x][i];
            
            //creates elements to display user input and adds classes to identify based on position in array
            var listItem = document.createElement("li");
            listItem.setAttribute("class", x + "-" + i);

            var itemDelete = document.createElement("button");
            itemDelete.setAttribute("class", "delete-buttons");
            itemDelete.setAttribute("id", x + "-" + i);
  
            //styles new elements
            listItem.style.display = "inline";
            listItem.style.margin = "0 5px 0 0";
            itemDelete.style.backgroundImage = "url('Develop/images/x-button.png')";
            itemDelete.style.backgroundSize = "contain";
            itemDelete.style.borderStyle = "none";
            itemDelete.style.backgroundColor = "none";
            itemDelete.style.width = "18px";
            itemDelete.style.height = "18px";
            listItem.textContent = selectedItem;

            //if statement to ensure saved items display to correct area of application
           if (x === 0) {
                toDoList.appendChild(listItem);
                toDoList.appendChild(itemDelete);
                
           } 
           if (x === 1) {
                sunday.appendChild(listItem);
                sunday.appendChild(itemDelete);
           }
           if (x === 2) {
                monday.appendChild(listItem);
                monday.appendChild(itemDelete);
            }
            if (x === 3) {
                tuesday.appendChild(listItem);
                tuesday.appendChild(itemDelete);
            }
            if (x === 4) {
                wednesday.appendChild(listItem);
                wednesday.appendChild(itemDelete);
            }
            if (x === 5) {
                thursday.appendChild(listItem);
                thursday.appendChild(itemDelete);
            }
            if (x === 6) {
                friday.appendChild(listItem);
                friday.appendChild(itemDelete);
            } 
            if (x === 7) {
                saturday.appendChild(listItem);
                saturday.appendChild(itemDelete);
            }
        }
    }

    //selects all delete buttons
    var deleteButtons = document.querySelectorAll(".delete-buttons");

    //adds click functionality to delete button
    for (var z = 0; z < deleteButtons.length; z++){

        deleteButtons[z].addEventListener("click", deleteItem);
    }

    //deletes clicked to-do and updates local storage
    function deleteItem() {

        //uses this to locate elements to be deleted and deletes them
        var thisDelete = this;
        var thisListItem = this.previousElementSibling;
        thisDelete.remove();
        thisListItem.remove();

        for (var x = 0; x < inputArray.length; x++) {
            for (var i = 0; i < inputArray[x].length; i++) {
                var selectedItem = inputArray[x][i];
                if (selectedItem == thisListItem.textContent) {
                    inputArray[x].splice(i, 1);
                }

            }
        }

        //saves updated data in local storage
        var inputArrayFormatted = JSON.stringify(inputArray);
        localStorage.setItem("item-array", inputArrayFormatted);

 
    }


}

printLocalStorage();
currentDayInfo();
customizedGreeting();
getLocation();
