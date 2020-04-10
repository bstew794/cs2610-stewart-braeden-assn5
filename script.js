document.title = "Vue.JS Weather App";

var titleCard = document.createElement("DIV");
titleCard.className = "stuff-box gray";
titleCard.id = "title_card";
document.body.appendChild(titleCard);

var testTitle = document.createElement("H2");
testTitle.innerHTML = "Vue.JS Weather App";
titleCard.appendChild(testTitle);

var locDiv = document.createElement("DIV");
locDiv.id = "location";
document.body.appendChild(locDiv);

var locTitle = document.createElement("H3");
locTitle.innerHTML = "Your location";
locDiv.appendChild(locTitle);

var locMessage = document.createElement("P");
locMessage.innerHTML = "Please Wait...";
locMessage.id = "location_message";
locDiv.appendChild(locMessage);

var currDiv = document.createElement("DIV");
currDiv.id = "current_conditions";
document.body.appendChild(currDiv);

var currTitle = document.createElement("H3");
currTitle.innerHTML = "Current Conditions";
currDiv.appendChild(currTitle);

var currMessage = document.createElement("P");
currMessage.innerHTML = "Current weather conditions @ " + getDateTime();
currDiv.appendChild(currMessage);

var currList = document.createElement("UL");
currList.className = "conditions_list";
currDiv.appendChild(currList);

var forecastDiv = document.createElement("DIV");
forecastDiv.id = "forecast"
document.body.appendChild(forecastDiv);

var forecastTitle = document.createElement("H3");
forecastTitle.innerHTML = "5 day 3-hour forecast";
forecastDiv.appendChild(forecastTitle);

var forecastMessage = document.createElement("P");
forecastTitle.id = "likelihood_message";
forecastDiv.appendChild(forecastMessage);

var forecastUnLike = document.createElement("SPAN");
forecastMessage.appendChild(forecastUnLike);

var forecastNue = document.createElement("SPAN");
forecastMessage.appendChild(forecastNue);

var forecastLike = document.createElement("SPAN");
forecastMessage.appendChild(forecastLike);

const locURL = 'http://api.ipstack.com/check?access_key=d819a0b842f699a515686f8c5a9757c8&fields=main'

fetch(locURL)
    .then((response) => {return response.json();})
    .then((data) => {
        var locMess = document.getElementById("location_message").innerHTML;
        locMess = "You are located at ";

        if ("city" in data){
            if (data.city != "NA"){
                locMess += data.city;
            }
        }
        if ("region_name" in data){
            if (data.region_name != "NA"){
                locMess += ", " + data.region_name;
            }
        }
        if ("country_name" in data){
            if (data.country_name != "NA"){
                locMess += ", " + data.country_name;
            }
        }
        var lat = data.latitude;
        var long = data.longitude

        locMess += " at coordinates (" + lat + ", " + long + ")"

        document.getElementById("location_message").innerHTML = locMess;

        var forecastURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long +
        "&units=imperial&appid=2f82263a2db94f47be29da3e930d958b";

        fetch(forecastURL)
            .then((response) => {return response.json();})
            .then((data) => {
                var conList = document.getElementById("current_conditions").querySelectorAll(".conditions_list")[0];

                var textMess = "Currently " + data.main.temp + "F";
                addLI(textMess, conList);

                textMess = "High " + data.main.temp_max + "F";
                addLI(textMess, conList);

                textMess = "Low " + data.main.temp_min + "F";
                addLI(textMess, conList);

                textMess = data.main.pressure + " hPa pressure";
                addLI(textMess, conList);

                textMess = data.main.humidity + "% humidity";
                addLI(textMess, conList);

                textMess = data.weather[0].description;
                addLI(textMess, conList);
            })
            .catch(function(err) {
                console.log("Something went wrong here...", err);
            })

            forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long +
            "&units=imperial&appid=2f82263a2db94f47be29da3e930d958b";

            fetch(forecastURL)
            .then((response) => {return response.json();})
            .then((data) => {
                var hourlyList = data.list;

                for(i=0; i<hourlyList.length; i++){
                    var hourly = hourlyList[i];
                    console.log(hourly);

                    var hourlyDiv = document.createElement("DIV");
                    hourlyDiv.id = "hourly_" + i;
                    forecastDiv.appendChild(hourlyDiv);

                    var date = new Date(hourly.dt * 1000);

                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    var year = date.getFullYear();

                    var dateFormat = month + "/" + day + "/" + year;

                    var hour = date.getHours();

                    if(hour < 10){
                        hour = "0" + hour;
                    }
                    var minute = date.getMinutes();

                    if(minute < 10){
                        minute = "0" + minute;
                    }
                    var second = date.getSeconds();

                    if(second < 10){
                        second = "0" + second;
                    }
                    var timeFormat = hour + ":" + minute + ":" + second;

                    var hourlyTitle = document.createElement("H4");
                    hourlyTitle.innerHTML = "Conditions for " + dateFormat + ", " + timeFormat;
                    hourlyDiv.appendChild(hourlyTitle);

                    var conList = document.createElement("UL");
                    conList.className = "conditions_list";
                    hourlyDiv.appendChild(conList);

                    addLI("Temperature " + hourly.main.temp + "F", conList);
                    addLI("High " + hourly.main.temp_max + "F", conList);
                    addLI("Low " + hourly.main.temp_min + "F", conList);
                    addLI(hourly.main.pressure + "hPa pressure", conList);
                    addLI(hourly.main.humidity + "% humidity", conList);
                    addLI(hourly.weather[0].description, conList);
                }
            })
            .catch(function(err) {
                console.log("Something went wrong here...", err);
            })
    })
    .catch(function(err) {
        console.log("Something went wrong here...", err);
    })

function getDateTime(){
    var today = new Date();
    var date = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date + " " + time;
}
function addLI(text, list){
    var lilly = document.createElement("LI");
    lilly.innerHTML = text;
    list.appendChild(lilly);
}
