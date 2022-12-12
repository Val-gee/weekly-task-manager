var category = "inspirational";
var currentDate = document.getElementById("currentDate");
var currentTime = document.getElementById("currentTime");
var startBtn = document.getElementById("start-time"); //for the add event listner to start timer
var pauseBtn = document.getElementById("pause"); //for the add event listener to the puase button
//timer button
var timerButton = document.querySelector(".timer");
var wasClicked = false;
var giphyDisplay = document.querySelector('.giphy');
var giphyImage = document.querySelector('.giphyImage');

//countdown variables
var secondsLeft = 3;
var minutesLeft = 0;
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
    var hourArray = [
        dayjs().hour(05),
        dayjs().hour(12),
        dayjs().hour(17),
        dayjs().hour(21),
    ];

    if (hour >= hourArray[0].format("HH") && hour < hourArray[1].format("HH")) {
        greeting.textContent = "Good Morning!";
    } else if (
        hour >= hourArray[1].format("HH") &&
        hour < hourArray[2].format("HH")
    ) {
        greeting.textContent = "Good Afternoon!";
    } else if (
        hour >= hourArray[2].format("HH") &&
        hour < hourArray[3].format("HH")
    ) {
        greeting.textContent = "Good Evening!";
    } else if (
        hour >= hourArray[3].format("HH") ||
        hour < hourArray[0].format("HH")
    ) {
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
        minutesLeft--;
    } else if (secondsLeft < 10) {
        secondsLeft = "0" + secondsLeft;
    }

    if (minutesLeft === -1) {
        clearInterval(timerInterval);
        secondsLeft = 60;
        minutesLeft = 59;
        // alert("Time is up!");
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
    if(minutesLeft == 0 && secondsLeft == 0){
        callGiphy();
        giphyDisplay.classList.remove('hide');
       // $(giphyDisplay).click();
    }
    countdown.textContent = minutesLeft + ":" + secondsLeft;
}

startBtn.addEventListener("click", timer);
function timer() {
    wasClicked = true;
    timerInterval = setInterval(resumeTimer, 1000);
}
pauseBtn.addEventListener("click", function () {
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
    var requestWeather =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=87e0914af1422e36fd0e0a7774720d6f";
    fetch(requestWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var currentCity = data.city.name;
            var currentTemp = data.list[0].main.temp;
            var currentTempFahrenheit = (
                ((currentTemp - 273.15) * 9) / 5 +
                32
            ).toFixed(0);
            var currentWeatherIcon = data.list[0].weather[0].icon;
            var weatherIcon = document.getElementById("weatherIcon");
            var imageURL =
                "https://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png";
            var cityAndTemp = document.getElementById("currentWeather");

            cityAndTemp.textContent =
                currentCity + " " + currentTempFahrenheit + "\u00B0F";
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
var inputArray = [[], [], [], [], [], [], [], []];

//gets save data from local storage and parses into array
var savedString = localStorage.getItem("item-array");
var savedArray = JSON.parse(savedString);

//if there is save data, inputArray will include it
if (savedArray != null) {
    inputArray = savedArray;
}

//prints input text to page based on user input and saves in local storage
sendBtn.addEventListener("click", function (event) {
    event.preventDefault();

  //creates new elements to display user input
  var listItem = document.createElement("li");
  var itemDelete = document.createElement("button");
  var lineBreak = document.createElement("br");

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
  itemDelete.style.display = "inline";

  //appends new elements in appropriate area of page
  if (selectedValue === "toDo") {
    toDoList.appendChild(listItem);
    toDoList.appendChild(itemDelete);
    toDoList.appendChild(lineBreak);
    inputArray[0].push(input);

    //this var is used to create an id for the new elements created
    var idNumber = "0-" + (inputArray[0].length - 1);

    var dayIndex = inputArray.findIndex(number => number = 0);
  } else if (selectedValue === "sunday") {
    sunday.appendChild(listItem);
    sunday.appendChild(itemDelete);
    sunday.appendChild(lineBreak);
    inputArray[1].push(input);

    var idNumber = "1-" + (inputArray[1].length - 1);

  } else if (selectedValue === "monday") {
    monday.appendChild(listItem);
    monday.appendChild(itemDelete);
    monday.appendChild(lineBreak);
    inputArray[2].push(input);

    var idNumber = "2-" + (inputArray[2].length - 1);

  } else if (selectedValue === "tuesday") {
    tuesday.appendChild(listItem);
    tuesday.appendChild(itemDelete);
    tuesday.appendChild(lineBreak);
    inputArray[3].push(input);

    var idNumber = "3-" + (inputArray[3].length - 1);

  } else if (selectedValue === "wednesday") {
    wednesday.appendChild(listItem);
    wednesday.appendChild(itemDelete);
    wednesday.appendChild(lineBreak);
    inputArray[4].push(input);

    var idNumber = "4-" + (inputArray[4].length - 1);

  } else if (selectedValue === "thursday") {
    thursday.appendChild(listItem);
    thursday.appendChild(itemDelete);
    thursday.appendChild(lineBreak);
    inputArray[5].push(input);

    var idNumber = "5-" + (inputArray[5].length - 1);

  } else if (selectedValue === "friday") {
    friday.appendChild(listItem);
    friday.appendChild(itemDelete);
    friday.appendChild(lineBreak);
    inputArray[6].push(input);

    var idNumber = "6-" + (inputArray[6].length - 1);

  } else {
    saturday.appendChild(listItem);
    saturday.appendChild(itemDelete);
    saturday.appendChild(lineBreak);
    inputArray[7].push(input);

    var idNumber = "7-" + (inputArray[7].length - 1);
  }

  //sets identical class and id for list item and delete button 
  listItem.setAttribute("class", idNumber);
  itemDelete.setAttribute("id", idNumber);

  //converts newly-modified inputArray to JSON and saves in local storage
  var inputArrayFormatted = JSON.stringify(inputArray);
  localStorage.setItem("item-array", inputArrayFormatted);

  //deletes to-do task from page, updates local storage, and adjusts ids and classes for created items
    function deleteItem() {
        var itemDeleteId = this.id;
        listItem.remove();
        itemDelete.remove();
        lineBreak.remove();

        for (var x = 0; x < inputArray.length; x++) {
            for (var i = 0; i < inputArray[x].length; i++) {
                var idNumber = (x + "-" + i);
                console.log(idNumber);
                console.log(itemDeleteId);
                if (itemDeleteId == idNumber) {
                    inputArray[x].splice(i, 1);

                    //selects all list items and delete buttons in a given section
                    var toDoItems = toDoList.children;
                    var sundayItems = sunday.children;
                    var mondayItems = monday.children;
                    var tuesdayItems = tuesday.children;
                    var wednesdayItems = wednesday.children;
                    var thursdayItems = thursday.children;
                    var fridayItems = friday.children;
                    var saturdayItems = saturday.children;

                    //if statement that changes ids and classes of affected list items to match the current array after item removal
                    if (x === 0) {
                        for (var b = 0; b < toDoItems.length; b += 3) {
                            var thisList = toDoItems[b];
                            var thisX = toDoItems[b].nextElementSibling;
                            thisList.removeAttribute("class");
                            thisList.setAttribute("class", x + "-" + (b / 3));
                            thisX.removeAttribute("id");
                            thisX.setAttribute("id", x + "-" + (b / 3));
                            console.log(thisList.className);
                            console.log(thisX.id);
    
                        }
                    } 
                    
                    else if (x === 1) {
                        for (var b = 0; b < sundayItems.length; b += 3) {
                            var thisList = sundayItems[b];
                            var thisX = sundayItems[b].nextElementSibling;
                            thisList.removeAttribute("class");
                            thisList.setAttribute("class", x + "-" + (b / 3));
                            thisX.removeAttribute("id");
                            thisX.setAttribute("id", x + "-" + (b / 3));
                            console.log(thisList.className);
                            console.log(thisX.id);
    
                        }
                    }
                    
                    else if (x === 2) {
                        for (var b = 0; b < mondayItems.length; b += 3) {
                            var t = 0;
                            var thisList = mondayItems[b];
                            var thisX = mondayItems[b].nextElementSibling;
                            thisList.removeAttribute("class");
                            thisList.setAttribute("class", x + "-" + (b / 3));
                            thisX.removeAttribute("id");
                            thisX.setAttribute("id", x + "-" + (b / 3));
                            console.log(thisList.className);
                            console.log(thisX.id);
    
                        }
                    } 
                    
                    else if (x === 3) {
                        for (var b = 0; b < tuesdayItems.length; b += 3) {
                            var t = 0;
                            var thisList = tuesdayItems[b];
                            var thisX = tuesdayItems[b].nextElementSibling;
                            thisList.removeAttribute("class");
                            thisList.setAttribute("class", x + "-" + (b / 3));
                            thisX.removeAttribute("id");
                            thisX.setAttribute("id", x + "-" + (b / 3));
                            console.log(thisList.className);
                            console.log(thisX.id);
    
                        }
                    } 
                    
                    else if (x === 4) {
                        for (var b = 0; b < wednesdayItems.length; b += 3) {
                            var t = 0;
                            var thisList = wednesdayItems[b];
                            var thisX = wednesdayItems[b].nextElementSibling;
                            thisList.removeAttribute("class");
                            thisList.setAttribute("class", x + "-" + (b / 3));
                            thisX.removeAttribute("id");
                            thisX.setAttribute("id", x + "-" + (b / 3));
                            console.log(thisList.className);
                            console.log(thisX.id);
    
                        }
                    } 
                    
                    else if (x === 5) {
                        for (var b = 0; b < thursdayItems.length; b += 3) {
                            var t = 0;
                            var thisList = thursdayItems[b];
                            var thisX = thursdayItems[b].nextElementSibling;
                            thisList.removeAttribute("class");
                            thisList.setAttribute("class", x + "-" + (b / 3));
                            thisX.removeAttribute("id");
                            thisX.setAttribute("id", x + "-" + (b / 3));
                            console.log(thisList.className);
                            console.log(thisX.id);
    
                        }
                    } 
                    
                    else if (x === 6) {
                        for (var b = 0; b < fridayItems.length; b += 3) {
                            var t = 0;
                            var thisList = fridayItems[b];
                            var thisX = fridayItems[b].nextElementSibling;
                            thisList.removeAttribute("class");
                            thisList.setAttribute("class", x + "-" + (b / 3));
                            thisX.removeAttribute("id");
                            thisX.setAttribute("id", x + "-" + (b / 3));
                            console.log(thisList.className);
                            console.log(thisX.id);
    
                        }
                    } 
                    
                    else {
                        for (var b = 0; b < saturdayItems.length; b += 3) {
                            var thisList = saturdayItems[b];
                            var thisX = saturdayItems[b].nextElementSibling;
                            thisList.removeAttribute("class");
                            thisList.setAttribute("class", x + "-" + (b / 3));
                            thisX.removeAttribute("id");
                            thisX.setAttribute("id", x + "-" + (b / 3));
                            console.log(thisList.className);
                            console.log(thisX.id);
                        }
                    }

                
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
    
}

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

            var lineBreak = document.createElement("br");

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
            toDoList.appendChild(lineBreak);
            }
            if (x === 1) {
                sunday.appendChild(listItem);
                sunday.appendChild(itemDelete);
                sunday.appendChild(lineBreak);
            }
            if (x === 2) {
                monday.appendChild(listItem);
                monday.appendChild(itemDelete);
                monday.appendChild(lineBreak);
            }
            if (x === 3) {
                tuesday.appendChild(listItem);
                tuesday.appendChild(itemDelete);
                tuesday.appendChild(lineBreak);
            }
            if (x === 4) {
                wednesday.appendChild(listItem);
                wednesday.appendChild(itemDelete);
                wednesday.appendChild(lineBreak);
            }
            if (x === 5) {
                thursday.appendChild(listItem);
                thursday.appendChild(itemDelete);
                thursday.appendChild(lineBreak);
            }
            if (x === 6) {
                friday.appendChild(listItem);
                friday.appendChild(itemDelete);
                friday.appendChild(lineBreak);
            }
            if (x === 7) {
                saturday.appendChild(listItem);
                saturday.appendChild(itemDelete);
                saturday.appendChild(lineBreak);
            }
        }   
    }
    
    //selects all delete buttons
    var deleteButtons = document.querySelectorAll(".delete-buttons");

    //adds click functionality to delete button
    for (var z = 0; z < deleteButtons.length; z++) {
        deleteButtons[z].addEventListener("click", deleteItem);
    }
}


//deletes clicked to-do and updates local storage
function deleteItem() {

    //uses this to locate elements to be deleted and deletes them
    var thisDelete = this;
    var thisListItem = this.previousElementSibling;
    var thisBreak = this.nextElementSibling;
    var itemDeleteId = this.id;
    thisDelete.remove();
    thisListItem.remove();
    thisBreak.remove();
    
    for (var x = 0; x < inputArray.length; x++) {
        for (var i = 0; i < inputArray[x].length; i++) {
            if (inputArray[x][i]) {
                var idNumber = (x + "-" + i);
                console.log(idNumber);
                console.log(itemDeleteId);
                if (itemDeleteId == idNumber) {
                    inputArray[x].splice(i, 1);

                    var toDoItems = toDoList.children;
                    var sundayItems = sunday.children;
                    var mondayItems = monday.children;
                    var tuesdayItems = tuesday.children;
                    var wednesdayItems = wednesday.children;
                    var thursdayItems = thursday.children;
                    var fridayItems = friday.children;
                    var saturdayItems = saturday.children;

                    if (x === 0) {
                        for (var b = 0; b < toDoItems.length; b += 3) {
                            var thisList = toDoItems[b];
                            var thisX = toDoItems[b].nextElementSibling;
                            thisList.removeAttribute("class");
                            thisList.setAttribute("class", x + "-" + (b / 3));
                            thisX.removeAttribute("id");
                            thisX.setAttribute("id", x + "-" + (b / 3));
                            console.log(thisList.className);
                            console.log(thisX.id);
    
                        }
                    } else if (x === 1) {
                        for (var b = 0; b < sundayItems.length; b += 3) {
                            var thisList = sundayItems[b];
                            var thisX = sundayItems[b].nextElementSibling;
                            thisList.removeAttribute("class");
                            thisList.setAttribute("class", x + "-" + (b / 3));
                            thisX.removeAttribute("id");
                            thisX.setAttribute("id", x + "-" + (b / 3));
                            console.log(thisList.className);
                            console.log(thisX.id);
    
                        }
                    } else if (x === 2) {
                        for (var b = 0; b < mondayItems.length; b += 3) {
                            var t = 0;
                            var thisList = mondayItems[b];
                            var thisX = mondayItems[b].nextElementSibling;
                            thisList.removeAttribute("class");
                            thisList.setAttribute("class", x + "-" + (b / 3));
                            thisX.removeAttribute("id");
                            thisX.setAttribute("id", x + "-" + (b / 3));
                            console.log(thisList.className);
                            console.log(thisX.id);
    
                        }
                    } else if (x === 3) {
                        for (var b = 0; b < tuesdayItems.length; b += 3) {
                            var t = 0;
                            var thisList = tuesdayItems[b];
                            var thisX = tuesdayItems[b].nextElementSibling;
                            thisList.removeAttribute("class");
                            thisList.setAttribute("class", x + "-" + (b / 3));
                            thisX.removeAttribute("id");
                            thisX.setAttribute("id", x + "-" + (b / 3));
                            console.log(thisList.className);
                            console.log(thisX.id);
    
                        }
                    } else if (x === 4) {
                        for (var b = 0; b < wednesdayItems.length; b += 3) {
                            var t = 0;
                            var thisList = wednesdayItems[b];
                            var thisX = wednesdayItems[b].nextElementSibling;
                            thisList.removeAttribute("class");
                            thisList.setAttribute("class", x + "-" + (b / 3));
                            thisX.removeAttribute("id");
                            thisX.setAttribute("id", x + "-" + (b / 3));
                            console.log(thisList.className);
                            console.log(thisX.id);
    
                        }
                    } else if (x === 5) {
                        for (var b = 0; b < thursdayItems.length; b += 3) {
                            var t = 0;
                            var thisList = thursdayItems[b];
                            var thisX = thursdayItems[b].nextElementSibling;
                            thisList.removeAttribute("class");
                            thisList.setAttribute("class", x + "-" + (b / 3));
                            thisX.removeAttribute("id");
                            thisX.setAttribute("id", x + "-" + (b / 3));
                            console.log(thisList.className);
                            console.log(thisX.id);
    
                        }
                    } else if (x === 6) {
                        for (var b = 0; b < fridayItems.length; b += 3) {
                            var t = 0;
                            var thisList = fridayItems[b];
                            var thisX = fridayItems[b].nextElementSibling;
                            thisList.removeAttribute("class");
                            thisList.setAttribute("class", x + "-" + (b / 3));
                            thisX.removeAttribute("id");
                            thisX.setAttribute("id", x + "-" + (b / 3));
                            console.log(thisList.className);
                            console.log(thisX.id);
    
                        }
                    } else {
                        for (var b = 0; b < saturdayItems.length; b += 3) {
                            var thisList = saturdayItems[b];
                            var thisX = saturdayItems[b].nextElementSibling;
                            thisList.removeAttribute("class");
                            thisList.setAttribute("class", x + "-" + (b / 3));
                            thisX.removeAttribute("id");
                            thisX.setAttribute("id", x + "-" + (b / 3));
                        }
                    }
                }   
            } 
        }
    }

    //saves updated data in local storage
    var inputArrayFormatted = JSON.stringify(inputArray);
    localStorage.setItem("item-array", inputArrayFormatted);


    //selects all delete buttons
    var deleteButtons = document.querySelectorAll(".delete-buttons");
}

// quote carousel

$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/quotes?limit=10&category=' + category,
    headers: { 'X-Api-Key': 'qqoTUSZvUbFCBjayEmFVIg==V6OGJcGtLVFiV2ym' },
    contentType: 'application/json',
    length: 10,
    success: function (result) {
        console.log(result);

        var quoteInput1 = document.querySelector("#quote1");
        var authorInput1 = document.querySelector("#author1");
        var quoteInput2 = document.querySelector("#quote2");
        var authorInput2 = document.querySelector("#author2");
        var quoteInput3 = document.querySelector("#quote3");
        var authorInput3 = document.querySelector("#author3");
        var quoteInput4 = document.querySelector("#quote4");
        var authorInput4 = document.querySelector("#author4");
        var quoteInput5 = document.querySelector("#quote5");
        var authorInput5 = document.querySelector("#author5");
        var quoteInput6 = document.querySelector("#quote6");
        var authorInput6 = document.querySelector("#author6");
        var quoteInput7 = document.querySelector("#quote7");
        var authorInput7 = document.querySelector("#author7");
        var quoteInput8 = document.querySelector("#quote8");
        var authorInput8 = document.querySelector("#author8");
        var quoteInput9 = document.querySelector("#quote9");
        var authorInput9 = document.querySelector("#author9");
        var quoteInput10 = document.querySelector("#quote10");
        var authorInput10 = document.querySelector("#author10");

        var quoteFromArray1 = result[0].quote;
        var authorFromArray1 = result[0].author;
        var quoteFromArray2 = result[1].quote;
        var authorFromArray2 = result[1].author;
        var quoteFromArray3 = result[2].quote;
        var authorFromArray3 = result[2].author;
        var quoteFromArray4 = result[3].quote;
        var authorFromArray4 = result[3].author;
        var quoteFromArray5 = result[4].quote;
        var authorFromArray5 = result[4].author;
        var quoteFromArray6 = result[5].quote;
        var authorFromArray6 = result[5].author;
        var quoteFromArray7 = result[6].quote;
        var authorFromArray7 = result[6].author;
        var quoteFromArray8 = result[7].quote;
        var authorFromArray8 = result[7].author;
        var quoteFromArray9 = result[8].quote;
        var authorFromArray9 = result[8].author;
        var quoteFromArray10 = result[9].quote;
        var authorFromArray10 = result[9].author;

        quoteInput1.append(quoteFromArray1);
        authorInput1.append(authorFromArray1);
        quoteInput2.append(quoteFromArray2);
        authorInput2.append(authorFromArray2);
        quoteInput3.append(quoteFromArray3);
        authorInput3.append(authorFromArray3);
        quoteInput4.append(quoteFromArray4);
        authorInput4.append(authorFromArray4);
        quoteInput5.append(quoteFromArray5);
        authorInput5.append(authorFromArray5);
        quoteInput6.append(quoteFromArray6);
        authorInput6.append(authorFromArray6);
        quoteInput7.append(quoteFromArray7);
        authorInput7.append(authorFromArray7);
        quoteInput8.append(quoteFromArray8);
        authorInput8.append(authorFromArray8);
        quoteInput9.append(quoteFromArray9);
        authorInput9.append(authorFromArray9);
        quoteInput10.append(quoteFromArray10);
        authorInput10.append(authorFromArray10);
        
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});

var giphy;
function callGiphy() {
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=WJehXnBYqgZwDbb3CV3I08L51yRFxFgk&s=congratulations&weirdness=1`)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function(data){
            console.log(data);
            giphy = data.data.images.downsized_large.url;
            console.log(giphy);
            giphyImage.setAttribute('src', giphy);
        

        });
    
    //close modal
    var closeModal = document.querySelector('#close-btn');
    closeModal.addEventListener('click',function(){
        giphyDisplay.classList.add('hide');

    });
}
    

//callGiphy();
printLocalStorage();
currentDayInfo();
customizedGreeting();
getLocation();
