
function currentCityTemp(response) {
    let bigTemp=document.querySelector("#mainTemp1");
    let dataTemp=Math.round(response.data.temperature.current);
    bigTemp.innerHTML=`${dataTemp}`;
    let descIcon=document.querySelector("#weatherLogo1");
    let dataIcon=`<img src="${response.data.condition.icon_url}"class="weatherLogo"/>`;
    descIcon.innerHTML=`${dataIcon}`;
    let descNote=document.querySelector("#description1");
    let descWords=response.data.condition.description;
    descNote.innerHTML=`${descWords}`;
    let airMoisture=document.querySelector("#hum");
    let dataMoisture=Math.round(response.data.temperature.humidity);
    airMoisture.innerHTML=`${dataMoisture}`;
    let windSpeed=document.querySelector("#speed");
    let dataSpeed=Math.round(response.data.wind.speed);
    windSpeed.innerHTML=`${dataSpeed}`;
    let cityElement=document.querySelector("#city1");
    cityElement.innerHTML=response.data.city;

    let timeElement=document.querySelector("#time1");
    let currentDate=new Date(response.data.time * 1000);
    let daysOfWeek=["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday","Saturday","Sunday"];
    let dayOfWeek=daysOfWeek[currentDate.getDay()];
    let monthsOfYear=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let monthOfYear=monthsOfYear[currentDate.getMonth()];
    let minutes=currentDate.getMinutes();
    let hour=currentDate.getHours();


    if (minutes < 10){
        minutes=`0${minutes}`;}
     if (hour < 10){
        hour=`0${hour}`;}
   
    timeElement.innerHTML=`Currently: ${dayOfWeek}, ${currentDate.getDate()} ${monthOfYear} ${currentDate.getFullYear()}, ${hour}:${minutes}`

    getForecast(response.data.city);

}

function searchCity(city) {
    let apiKey="04ob736aa4t08e640af8d42f31cbf09f";
    let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(currentCityTemp);
}
function search(event) {
    event.preventDefault();
    let searchInput=document.querySelector("#search-text-input");
    searchCity(searchInput.value);
}

function formatDay(timestamp){
    let forecastDate=new Date(timestamp * 1000);
    let daysOftheWeek=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return daysOftheWeek[forecastDate.getDay()];}

function getForecast(city) {
    let apiKey="04ob736aa4t08e640af8d42f31cbf09f";
    let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`
    axios(apiUrl).then(displayForecast);}

function displayForecast(response){
    let forecastHtml=``;
    response.data.daily.forEach(function(day,index){
        if (index < 2) {
            forecastHtml =
            forecastHtml +
            `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <img src="${day.condition.icon_url}"class="weather-forecast-icon"/>
            <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
            <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
            </div>
            </div>`;
        } });

let forecastElement=document.querySelector("#forecast");
forecastElement.innerHTML=forecastHtml;}

let searchForm=document.querySelector("#search-form");
searchForm.addEventListener("submit",search);


searchCity("San-Francisco");


