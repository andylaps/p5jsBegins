var 	gWSpeed = 10, 
		gWSrcGeoDeg, //degrees
		gWDestGeoDeg;

// arrow dimensions		
var	aTailHt = 60,
		aHeadHt = 60,
		aTailWd = 20,
		aHeadWd = 40,
		aTotalHt = aTailHt+aHeadHt;
// abstract coordinates to draw arrow around ctr of rotation (ctrRot 0,0)
var arrowShape = [
		-aTailWd/2, aTotalHt/2,
		-aTailWd/2, -aTotalHt/2+(aHeadHt),
		-aHeadWd/2, -aTotalHt/2+(aHeadHt),
		0, -aTotalHt/2,
		aHeadWd/2, -aTotalHt/2+(aHeadHt),
		aTailWd/2, -aTotalHt/2+(aHeadHt),
		aTailWd/2, aTotalHt/2
		];	

var	gNoArrows = 5 ;
		gSystem = [];

function preload() {
// Request data from openweathermap.org
  console.log("preload start");
  var url = 'http://api.openweathermap.org/data/2.5/weather?id=2643186&units=metric&appid=b57b9ad1a3c41eafc00f4c2fa37c4d96';
  weather = loadJSON(url);
  console.log("preload done");
} // preload()		

function setup() { 
	// load data into global variables
	gWSrcGeoDeg = round(weather.wind.deg);
	
	// calculate angle for arrow to point = wind direction + 180deg
	// use JS modulo (%) operator to limit rotation to 360deg
	gWDestGeoDeg = (gWSrcGeoDeg+180) % 360;
	// if (gWSrcGeoDeg+180 > 360) {
	// 	gWDestGeoDeg = gWSrcGeoDeg 
	// }	else	{
	// 		gWDestGeoDeg = gWSrcGeoDeg+180
	// };

	gWSpeed = weather.wind.speed;
	println(weather.wind.deg+" "+weather.wind.speed);
	// convert geo angle to P5 angle
	// do it in stages for clarity
	// not sure I need these anymore
	// gWSrcRad = radians(gWSrcGeoDeg);
	// gWDestP5 = gWSrcRad + PI;
	println("gWSrcGeoDeg "+gWSrcGeoDeg);
	// println("gWSrcRad "+gWSrcRad);
	// println("gWDestP5 "+gWDestP5);
	createCanvas(800,	600);
	// translate(width,height);
// draw some lines for reference purposes	
	background("grey");
	stroke("green");
	line(width/2,0,width/2,height);
	stroke("red");
	line(0,height/2,width,height/2);
	stroke("green");
	line(-width/2,100,width,100);
	noStroke();
// spawn arrows proportional to wind speed (wSpeed)	
	for (var i = 0; i < gNoArrows; i++) {
		gSystem[i] = new Arrow(i);
	} // for

} // setup


function draw() {
	background("grey");
	for (var i = 0; i < gSystem.length; i++) {
		gSystem[i].update();
		gSystem[i].show();
	}
} // draw


function Arrow(a) { // arrow constructor 
	this.turn = 0;
	this.fullGrown = false;
	this.fullTurn = false;

	this.vel = createVector(gWSpeed,gWSpeed);
	// this.pos = createVector(200+a*50,200+a*50);
	this.pos = createVector(random(0,width-aTotalHt),random(0,height-aTotalHt));

	// need to correct overrun
	this.update = function() {
	// rotate arrow to point FROM source = wind direction + 180deg
	if (this.fullTurn == false){
		// this.turn = this.turn+1;	
		if (this.turn == gWDestGeoDeg) {
		this.fullTurn = true;
		println(this.turn);
		}	
		this.turn = this.turn+1;
		return; 		
	}
	this.pos.add(this.vel);
	} 


	this.show = function() {
	push();	
	translate(this.pos.x,this.pos.y);
	rotate(radians(this.turn));
	beginShape();
		for (var i = 0; i<arrowShape.length; i+=2) {
		vertex(arrowShape[i], arrowShape[i+1]);
		}; // for
	endShape(CLOSE);
	pop();
	} // show


} // Arrow