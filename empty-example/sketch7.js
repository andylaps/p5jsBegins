var 	gWSpeed = 10, 
		gWSrcGeoDeg, // degrees
		gWDestGeoDeg; // degrees

// arrow dimensions		
var	aTailHt = 40,
		aHeadHt = 40,
		aTailWd = 11,
		aHeadWd = 20,
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

var	gNoArrows = 3;
		gSystem = [];
		gFlybackMult = 150;

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
	gWSpeed = weather.wind.speed;
// create vector from scalar speed
	gWSpeedVector = p5.Vector.fromAngle(radians(gWSrcGeoDeg)+PI/2);

// scale speed vector proportional to wind speed 	
	gWSpeedVector.mult(gWSpeed);
	gWFlybackVector = gWSpeedVector.copy();
	gWFlybackVector.mult(gFlybackMult);
	println("gWSpeedVector "+" "+gWSpeedVector);
	println("gWFlybackVector "+gWFlybackVector);
	println(weather.wind.deg+" "+weather.wind.speed);
// calculate angle for arrow to point = wind direction + 180deg
// use JS modulo (%) operator to limit rotation to 360deg
	gWDestGeoDeg = (gWSrcGeoDeg+180) % 360;

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
// // draw some lines for reference purposes	
// 	background("grey");
// 	stroke("green");
// 	line(width/2,0,width/2,height);
// 	stroke("red");
// 	line(0,height/2,width,height/2);
// 	stroke("green");
// 	line(-width/2,100,width,100);
	noStroke();
	fill(255,102)
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
// not strictly necessary to use this.vel - here for completeness
	this.vel = gWSpeedVector.copy();
	this.flyback = gWFlybackVector.copy();
	
	if (a % 5 == 0) {
		this.colString = "red";
	} 	else { 
		this.colString = "white";
	}
	this.pos = createVector(random(0,width),random(0,height));
	println("this.pos "+this.pos);
	println("this.vel "+this.vel);
	println("this.flyback "+this.flyback);
	
	// this.pos = createVector(200+a*50,200+a*50);
	
	

	this.update = function() {
// rotate arrow to point FROM source = wind direction + 180deg
		if (this.fullTurn == false){
			if (this.turn == gWDestGeoDeg) {
			this.fullTurn = true;
			println(this.turn);
			}	
			this.turn = this.turn+1;
			return; // don't do anything else until rotate is complete
		}
		if (this.pos.x < 0 || this.pos.y < 0 ) {
			this.pos.sub(this.flyback);
		}	else {
			this.pos.add(this.vel);
		}

	}
		
	this.show = function() {
		push();
		fill(this.colString);	
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