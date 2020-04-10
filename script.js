document.title = "Vue.JS Weather App";

var titleCard = document.createElement("DIV");
titleCard.className = "stuff-box black";
titleCard.id = "title_card";
document.body.appendChild(titleCard);

var testTitle = document.createElement("H2");
testTitle.innerHTML = "Vue.JS Weather App";
titleCard.appendChild(testTitle);

var locDiv = document.createElement("DIV");
locDiv.id = "location";
document.body.appendChild(locDiv);

var locTitle = document.createElement("H4");
locTitle.innerHTML = "Your location";
locDiv.appendChild(locTitle);

var locMessage = document.createElement("P");
locMessage.innerHTML = "Please Wait...";
locMessage.id = "location_message";
locDiv.appendChild(locMessage);

var currDiv = document.createElement("DIV");
currDiv.id = "current_conditions";
document.body.appendChild(currDiv);

var currTitle = document.createElement("H4");
currTitle.innerHTML = "Current Conditions";
currDiv.appendChild(currTitle);

var currMessage = document.createElement("P");
currMessage.innerHTML = "Current weather conditions @ " + getDateTime();
currDiv.appendChild(currMessage);

var currList = document.createElement("UL");
currList.id = "conditions_list";
currDiv.appendChild(currList);

var forecastDiv = document.createElement("DIV");
document.body.appendChild(currDiv);

var forecastTitle = document.createElement("H5");
forecastTitle.innerHTML = "5 day 3-hour forecast";
forecastDiv.appendChild(forecastTitle);

var forecastMessage = document.createElement("P");
forecastDiv.appendChild(forecastMessage);

var forecastUnLike = document.createElement("SPAN");
forecastMessage.appendChild(forecastUnLike);

var forecastNue = document.createElement("SPAN");
forecastMessage.appendChild(forecastNue);

var forecastLike = document.createElement("SPAN");
forecastMessage.appendChild(forecastLike);

const locURL = 'https://api.ipstack.com/check?d819a0b842f699a515686f8c5a9757c8'

fetch()

function getDateTime(){
    var today = new Date();
    var date = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date + " " + time;
}

function addOutput(color, num, operator, num1){
    var outputEl = document.createElement("DIV");
    outputEl.className = "stuff-box red";
    outputEl.onclick = function(e) {this.parentNode.removeChild(this)};
    outputDiv.insertBefore(outputEl, outputDiv.childNodes[0]);

    var timestamp = document.createElement("P");
    timestamp.style.display = "inline";
    timestamp.innerHTML = getDateTime();
    timestamp.className = "timestamp";
    outputEl.appendChild(timestamp);
}