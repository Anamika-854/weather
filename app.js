
getweather = async()=> {
const apikey="b248b98b6b2e68ddb4639c036243adbe";
let cityname = document.querySelector("input").value;

if(!cityname){
    console.log("please first enter the city name");
    return;
}

const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}`

try {
    let rest = await fetch(url);
    if(!rest.ok){
        throw new Error(`HTTP error! Status: ${rest.status}`); 
    }
    let weather= await rest.json();
    console.log("Weather Data:", weather);
          return weather;
}
    catch(e){
  console.log("error:",e);
    return[];
    }
}
    document.querySelector("button").addEventListener("click",async()=>{
        const weatherdata = await getweather();
        if (weatherdata) {
            const tempKelvin = weatherdata.main.temp;
            const tempCelsius = Math.floor(tempKelvin - 273.15);
            const feelsLikeKelvin = weatherdata.main.feels_like;
            const feelsLikeCelsius = Math.floor(feelsLikeKelvin - 273.15);

            let city = document.querySelector("h6");
            let temp = document.querySelector("#temp");
            let sunny = document.querySelector(".text-warning");
            let wind = document.querySelector(".windspeed");
            let feel = document.querySelector("#feel");

            if (city) city.innerText = weatherdata.name;
            if (temp) temp.innerText = `${tempCelsius}°C`;
            if (sunny) sunny.innerText = weatherdata.weather[0].description;
            if (wind) wind.innerText = `${weatherdata.wind.speed} m/s`;
            if (feel) feel.innerText = `${feelsLikeCelsius}°C`;
        }
    })
