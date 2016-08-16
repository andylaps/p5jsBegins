var weather; // output from JSON request
var noOfArrows = 10;
var world = [];
var arrBase = 256, arrHeight = 275;
var aTemp, wSpeed, wDir;

function preload() {
// Request data from openweathermap.org
  console.log("preload start");
  var url = 'http://api.openweathermap.org/data/2.5/weather?id=2643186&units=metric&appid=b57b9ad1a3c41eafc00f4c2fa37c4d96';
  weather = loadJSON(url);
    console.log(weather);
  console.log("preload done");
} // preload()

function setup() {  
  console.log("setup start");
  createCanvas(windowWidth, windowHeight-100);
  background("#AAAAAA");
  console.log("canvas w="+width+" h="+height);
  processWeather(weather);
  makeWorld();

    function processWeather() {
      console.log("processWeather start");
    // load weather data to global variables  
      aTemp = weather.main.temp;
      wSpeed = weather.wind.speed;
      wDir = weather.wind.deg;
    // report data to js console
      console.log('\n'+"The Weather Right Now"+'\n'+"temp:"+aTemp+'\n'+"wind speed:"+wSpeed+'\n'+"wind direction:"+wDir+'\n'+'\n');
      console.log("processWeather done");
    } // processWeather()
     
    function makeWorld() {
      console.log("makeWorld start");
      for (var i = 0; i < noOfArrows; i++) {
        world.push(new Arrow(i));
      }  
      // make divs for text data and assign class to them
      var aTempDiv = createDiv("Temp: " + aTemp + "<small>m/s</small>");
      var wSpeedDiv = createDiv("Wind speed: " + wSpeed + "<small>m/s</small>");
      var wDirDiv = createDiv("Wind direction: " + wDir + "<small>deg</small>");
      wSpeedDiv.class("info"); 
      wDirDiv.class("info"); 
      aTempDiv.class("info"); 
      console.log("makeWorld done");
  }
  console.log("setup done");
}
  
function draw() {
  for (var i = 0; i < world.length; i++) {
    world[i].move();
    world[i].display();
  }
}

// constructor for Arrow class 
function Arrow(j) {
    console.log("constructor start");
    this.xStart = random(width);
    this.yStart = random(height);
    this.x1 = this.xStart;
    this.y1 = this.yStart;
    this.x2 = this.x1 + arrBase/2;
    this.y2 = this.y1 - arrHeight; 
    this.x3 = this.x1 + arrBase;
    this.y3 = this.y1;
    this.xCtr = this.x2;
    this.yCtr = this.y2+arrHeight/2
    this.name = 'arrow'+j;
console.log(this.name+" xStart "+this.xStart);
    
    this.move = function() {
      // nothing to see here yet!
      wDir=wDir+1;
      
    }

    this.display = function() {
      push();
      angleMode(DEGREES);
      translate(this.xCtr,this.yCtr);
      // translate(500,250);
      rotate(wDir);
      fill(204, 101, 192, 255);
      noStroke();
      triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
      pop();  
    }

    console.log("constructor done");

} // Arrow constructor
