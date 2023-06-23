let form = document.querySelector("form");
let inp=document.querySelector(".search-input");
let city = document.querySelector(".city");
let allback=document.querySelector(".all-weather");


// city.style.display="none";


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let input = document.querySelector("input");
  let ACCESS_KEY = "Vo2RTXiSeZqJlZiS_ODVCWYMLlPeGQjt_5Krv1cOfV0";
  let API_KEY = "bb8d8cf0e7a1ec3a1463872c28f33dce";

  try {
    let response = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&query=${input.value}`
    );
    let data = await response.json();

    let img = "";
    data.results.forEach((item) => {
      console.log(item.urls.full);
      img = item.urls.full;
    });
    city.style.backgroundImage = `url('${img}')`;
    city.style.display="block";
  } catch (error) {
    console.log(error);
  }

  const arrMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = document.querySelector(".dateD");
  let nowDate = new Date();
  let day = nowDate.getDate();
  let monthNum = nowDate.getMonth();
  let month = arrMonth[monthNum];
  date.innerHTML = `${day} ${month}`;

  let sunCloud = document.querySelector(".sun-cloud");

  let temp = document.querySelector(".temp");

  let country = document.querySelector(".country");

  let weat = document.querySelector(".how-weather");

  let wind_speed=document.querySelector(".wind-deg");

  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}`
    );
    city.style.display="block";
    let result = await response.json();
    console.log(result.main.temp);
    let celci = result.main.temp - 273.15;
    temp.innerHTML = Math.round(celci) + "˚";
    country.innerHTML = `${result.name} , ${result.sys.country}`;
    weat.innerHTML=result.weather[0].description;

    if(result.weather[0].description.includes("cloud")){
      sunCloud.src="./assets/img/clouds.png";
      allback.style.backgroundImage=`url("./assets/img/cloudBack.webp")`
    }
    else if(result.weather[0].description.includes("rain")){
      sunCloud.src="./assets/img/rainy-day.png";
      allback.style.backgroundImage=`url("./assets/img/rainyback.jpeg")`
    }
    else if(result.weather[0].description.includes("snow")){
      sunCloud.src="./assets/img/snowflake.png";
      allback.style.backgroundImage=`url("./assets/img/snowback.jpeg")`
    }
    else if(result.weather[0].description.includes("thunderstorm")){
      sunCloud.src="./assets/img/thunderstorm.png";
      allback.style.backgroundImage=`url("./assets/img/thunderback.webp")`
    }
    else if(result.weather[0].description.includes("mist")){
      sunCloud.src="./assets/img/clouds.png";
      allback.style.backgroundImage=`url("./assets/img/mistback.jpeg")`
    }
    else{
      sunCloud.src="./assets/img/sun.png";
      allback.style.backgroundImage=`url("./assets/img/sunback.jpeg")`
    }


    wind_speed.innerHTML=Math.round(result.wind.speed) + " km/h";
    console.log(result);
    inp.value="";
  } catch (error) {
    console.log(error);
    alert("Write true location!");
    window.location.reload();
  }
});
