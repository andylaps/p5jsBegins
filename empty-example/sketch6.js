var 	wSpeed = 10, 
		wSrcGeoDeg = 63; //degrees
		
var	aTailHt = 50,
		aHeadHt = 50,
		aTailWd = 10,
		aHeadWd = 20;

arrowShape = [
		0,0,
		0,-aTailHt,
		-(aHeadWd-aTailWd)/2,-aTailHt,
		aTailWd/2,-(aTailHt+aHeadHt),
		aTailWd+((aHeadWd-aTailWd)/2),-aTailHt,
		aTailWd,-aTailHt,
		aTailWd,0
		];

var	noArrows = 1,
		allArrows = [];


var 	aLineVector; // arrows built along this line - perpendicular to wind
var	aTravVector; // line of travel for arrows
var 	aLineDX, aLineDY;

		

function setup() {
	// convert geo angle to P5 angle and calculate line for arrow start points
	wSpeedScaled = wSpeed*0.05;
	wSrcRad = radians(wSrcGeoDeg);
	wDestP5 = wSrcRad+PI; 
	aTravAngle = wDestP5-HALF_PI;
	println("aTravAngle "+aTravAngle);
	aTravVector = p5.Vector.fromAngle(aTravAngle); 
	aLineVector = p5.Vector.fromAngle(aTravAngle-HALF_PI);
	aLineDX=aLineVector.x;
	aLineDY=aLineVector.y;
	println("aTravVector "+ aTravVector);
	println("aLineVector "+aLineVector);
	println("Wind source geo deg "+ wSrcGeoDeg);
	println("Wind destination P5 rad " + wDestP5);
	println("arrow pointing deg "+degrees(wDestP5));
	println("line heading deg "+degrees(aLineVector.heading()));
	createCanvas(800,	600);
	for (var i = 0; i < noArrows; i++) {
		allArrows[i] = new Arrow(i);
	}
	println("allArrows "+allArrows);


 }//setup

function draw() {
	background("#AbbAAA");
// draw the arrows
	for (var i = 0; i < noArrows; i++) {
		allArrows[i].update();
		allArrows[i].show();
	}
	translate(width/2,height/2);
// draw some reference lines - for use in development
// this is an older version for drawing the arrow start line
// could be replaced with a vectorised version

	stroke("red");
	line(400*aLineDX,400*aLineDY,-400*aLineDX,-400*aLineDY);

	stroke("green")
	line(-width/2,0,width,0);

	corner = createVector(width-100, -100);

	line(corner.x, corner.y, aLineVector.x, aLineVector.y);


}





function Arrow(a) {
	
	// arrow properties
	this.count = 1;
	this.vel = createVector();
	this.pos = createVector(width,-50);
	this.vel.add(aTravVector);
	this.vel.mult(wSpeedScaled);
	this.timeOut = 20; //unused at present

	println("this.vel "+ this.vel);
	println("Arrow "+a+" "+this.pos);
	
	this.update = function() {
		this.pos.add(this.vel);		
	} 	 // update()

	this.show = function(a) {
		push();
		noStroke();
		fill("green");
		translate(this.pos.x,this.pos.y);
		rotate(wDestP5);
		beginShape();
		for (var i = 0; i<arrowShape.length; i+=2) {
		vertex(arrowShape[i], arrowShape[i+1]);
		};
		endShape(CLOSE);
		pop();
		// this.report();

	} // show()

	this.report = function() {
		println(this.x+" "+this.y);	
	}
} // Arrow()


function displayArrow() {
	// println("displayArrow starts");	
	// n=n+1;
	translate(width/2,height/2);
	stroke("green")
	line(-width,0,width,0);
	stroke("red");
	line(400*aLineDX,400*aLineDY,-400*aLineDX,-400*aLineDY);

	// m=m+7;
	rotate(wDestP5);
	noStroke();
	beginShape();
	for (var i = 0; i<arrowShape.length; i+=2) {
		vertex(arrowShape[i], arrowShape[i+1]);
	};
	endShape(CLOSE);
	// println("displayArrow ends")
} // displayArrow




