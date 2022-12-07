var APIKey = "87e0914af1422e36fd0e0a7774720d6f";
//today's date
var today = dayjs();
var todayFormatted = today.format("dddd, MMM D");
var currentDate = document.getElementById("currentDate");
//today's time
var time = today.format("h:mm a");
var currentTime = document.getElementById("currentTime");
//timer button
var timerButton = document.querySelector(".timer");

function currentDayInfo() {
    currentDate.textContent = todayFormatted;
    currentTime.textContent = time;
}

timerButton.addEventListener("click", function() {
    function hourTimer() {
        var timerInterval = setInterval(function() {
            
        }, 60000);
    }
});


currentDayInfo();