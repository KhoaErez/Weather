const search = document.querySelector(".search");
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const val = document.querySelector(".value");
const visibility = document.querySelector(".visibility");
const wind = document.querySelector(".wind");
const sun = document.querySelector(".sun");
const time = document.querySelector(".time");
const content = document.querySelector(".content");
const temperature = document.querySelector(".temperature");
const describe = document.querySelector(".describe");
const more_describe = document.querySelector(".more-describe");
const main = document.querySelector("body");

async function changeWeatherUI(search) {
  let UrlKey = "ed67b84e27a16b7827ff92a053cb332a";
  let appUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${UrlKey}&units=metric`;

  // gọi API và xử lý kết quả
  // fetch(appUrl)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //     city.innerText = data.name;
  //     country.innerText = data.sys.country;
  //   });

  const response = await fetch(appUrl);
  const data = await response.json();
  console.log(data);
  if (data.cod == 200) {
    city.innerText = data.name;
    country.innerText = data.sys.country;
    let deg = Math.round(data.main.temp);
    val.innerHTML = deg + "<sup>0</sup>C";
    describe.innerText = data.weather[0].main;
    visibility.innerText = data.visibility + "ms";
    wind.innerText = data.wind.speed + "m/s";
    sun.innerText = data.main.humidity + "%";
    time.innerText = new Date().toLocaleString("vi");
    content.classList.remove("hiden");
    temperature.classList.remove("hiden");
    describe.classList.remove("hiden");
    more_describe.classList.remove("hiden");
    if (deg > 29) {
      main.classList.add("hot");
    } else if (deg > 24) {
      main.classList.add("warm");
    } else if (deg > 19) {
      main.classList.add("cool");
    } else {
      main.classList.add("cold");
    }
  } else {
    content.classList.add("hiden");
    temperature.classList.add("hiden");
    describe.classList.add("hiden");
    more_describe.classList.add("hiden");
  }
}

changeWeatherUI("vinh");

search.addEventListener("keypress", (e) => {
  if (e.code === "NumpadEnter" || e.code === "Enter") {
    let cityName = search.value.trim();
    changeWeatherUI(cityName);
    cityName = "";
    search.value = cityName;
  }
});
