let city="San-Francisco";
let apiKey="04ob736aa4t08e640af8d42f31cbf09f";
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

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
};
function search(event) {
    event.preventDefault();
    let city=document.querySelector("#search-text-input").value;
    let cityElement=document.querySelector("#city1");
    cityElement.innerHTML=city;

    let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(currentCityTemp);
}


let searchForm=document.querySelector("#search-form");
searchForm.addEventListener("submit",search);

