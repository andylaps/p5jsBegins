var weather;

function setup() {
  createCanvas(720, 200);
  // Request the data from openweathermap.org
  var url = 'http://api.openweathermap.org/data/2.5/weather?id=2643186&units=metric&appid=b57b9ad1a3c41eafc00f4c2fa37c4d96';
  weather = loadJSON(url, processWeather);

  function processWeather(weather) {
  // do nothing except report data to js console
  console.log("temp:"+weather.main.temp+'\n'+"wind speed:"+weather.wind.speed+'\n'+"wind direction:"+weather.wind.deg);
  }
}